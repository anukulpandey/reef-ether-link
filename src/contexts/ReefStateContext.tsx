import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { NETWORK_CONFIGS, NetworkType, network$, type NetworkConfig } from 'reef-evm-util-lib';
import { REEF_MAINNET_API_URL, REEF_MAINNET_RPC_TARGET } from '@/lib/reefNetwork';

type ReefNetwork = typeof NetworkType.ReefMainnet | typeof NetworkType.ReefLocalhost;

type ReefStateContextValue = {
  isReefReady: boolean;
  selectedNetwork: ReefNetwork;
  isSwitchingNetwork: boolean;
  setSelectedNetwork: (network: ReefNetwork) => void;
};

const DEFAULT_NETWORK = NetworkType.ReefMainnet;
const NETWORK_STORAGE_KEY = 'reef:selected-network';
const NETWORK_PREFERENCE_SET_KEY = 'reef:selected-network-explicit';
const NETWORK_CHANGE_SIGNAL_KEY = 'reef:network-change-signal';
const REEF_MAINNET_CONFIG: NetworkConfig = {
  ...NETWORK_CONFIGS[NetworkType.ReefMainnet],
  substrateWsRpcUrl: 'https://rpc.reefscan.com',
  substrateRpcUrl: 'https://rpc.reefscan.com',
  evmRpcUrl: REEF_MAINNET_RPC_TARGET,
  blockExplorerUrl: REEF_MAINNET_API_URL,
};
const APP_NETWORK_CONFIGS: Record<ReefNetwork, NetworkConfig> = {
  [NetworkType.ReefMainnet]: REEF_MAINNET_CONFIG,
  [NetworkType.ReefLocalhost]: NETWORK_CONFIGS[NetworkType.ReefLocalhost],
};

const getInitialNetwork = (): ReefNetwork => {
  if (typeof window === 'undefined') return DEFAULT_NETWORK;
  const stored = window.localStorage.getItem(NETWORK_STORAGE_KEY);
  const hasExplicitPreference = window.localStorage.getItem(NETWORK_PREFERENCE_SET_KEY) === '1';

  if (stored === NetworkType.ReefMainnet) {
    return stored;
  }

  // Migrate legacy installs that persisted the old localhost default automatically.
  if (stored === NetworkType.ReefLocalhost && hasExplicitPreference) {
    return stored;
  }

  return DEFAULT_NETWORK;
};

const ReefStateContext = createContext<ReefStateContextValue>({
  isReefReady: false,
  selectedNetwork: DEFAULT_NETWORK,
  isSwitchingNetwork: false,
  setSelectedNetwork: () => {},
});

export const ReefStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [isReefReady, setIsReefReady] = useState(false);
  const [isSwitchingNetwork, setIsSwitchingNetwork] = useState(false);
  const [selectedNetwork, setSelectedNetworkState] = useState<ReefNetwork>(getInitialNetwork);

  const setSelectedNetwork = useCallback((network: ReefNetwork) => {
    setSelectedNetworkState((current) => {
      if (current === network) return current;

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(NETWORK_STORAGE_KEY, network);
        window.localStorage.setItem(NETWORK_PREFERENCE_SET_KEY, '1');
        window.localStorage.setItem(NETWORK_CHANGE_SIGNAL_KEY, `${Date.now()}:${network}`);
        // Force a full refresh so all screens/hooks reset against the new network.
        window.setTimeout(() => window.location.reload(), 25);
      }

      return network;
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onStorage = (event: StorageEvent) => {
      if (event.key !== NETWORK_CHANGE_SIGNAL_KEY || !event.newValue) return;
      // Reload other open tabs/windows when network changes elsewhere.
      window.location.reload();
    };

    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  useEffect(() => {
    setIsReefReady(false);
    setIsSwitchingNetwork(true);

    try {
      // Use app-owned network config until the upstream library release is published.
      network$.next(APP_NETWORK_CONFIGS[selectedNetwork]);
      setIsReefReady(true);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(NETWORK_STORAGE_KEY, selectedNetwork);
      }
    } catch (err) {
      console.error('Failed to initialize reef network:', err);
    } finally {
      setIsSwitchingNetwork(false);
    }
  }, [selectedNetwork]);

  const value = useMemo(
    () => ({
      isReefReady,
      selectedNetwork,
      isSwitchingNetwork,
      setSelectedNetwork,
    }),
    [isReefReady, selectedNetwork, isSwitchingNetwork, setSelectedNetwork],
  );

  return (
    <ReefStateContext.Provider value={value}>
      {children}
    </ReefStateContext.Provider>
  );
};

export const useReefState = () => useContext(ReefStateContext);
