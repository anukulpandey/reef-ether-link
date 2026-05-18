import type { Connector } from '@wagmi/core';
import { reefMainnet } from '@/lib/wagmi';

const GENERIC_INJECTED_CONNECTOR_NAME = 'Injected';
const BROWSER_WALLET_LABEL = 'Browser Wallet';

type MaybeConnector = Pick<Connector, 'getProvider' | 'id' | 'name' | 'type'>;

const getFallbackProvider = () => {
  if (typeof window === 'undefined') return undefined;

  const injectedProvider = (window as any).ethereum;
  if (!injectedProvider) return undefined;

  if (Array.isArray(injectedProvider.providers) && injectedProvider.providers.length === 1) {
    return injectedProvider.providers[0];
  }

  return injectedProvider;
};

export const getWalletDisplayName = (walletName?: string | null) => {
  if (!walletName) return 'Wallet';
  return walletName === GENERIC_INJECTED_CONNECTOR_NAME ? BROWSER_WALLET_LABEL : walletName;
};

export const getDisplayWalletConnectors = <T extends MaybeConnector>(connectors: readonly T[]) => {
  const hasNamedInjectedWallet = connectors.some(
    (connector) =>
      connector.type === 'injected' && connector.name !== GENERIC_INJECTED_CONNECTOR_NAME,
  );

  const seen = new Set<string>();

  return connectors
    .filter((connector) => {
      if (
        connector.type === 'injected' &&
        connector.name === GENERIC_INJECTED_CONNECTOR_NAME &&
        hasNamedInjectedWallet
      ) {
        return false;
      }

      const key = `${connector.id}:${connector.name}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((left, right) => {
      if (left.name === GENERIC_INJECTED_CONNECTOR_NAME) return 1;
      if (right.name === GENERIC_INJECTED_CONNECTOR_NAME) return -1;
      return left.name.localeCompare(right.name);
    });
};

export const requestAddReefNetwork = async (connector?: MaybeConnector | null) => {
  const provider = (await connector?.getProvider?.().catch(() => undefined)) ?? getFallbackProvider();
  if (!provider?.request) {
    throw new Error('No compatible EVM wallet provider found');
  }

  await provider.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: `0x${reefMainnet.id.toString(16)}`,
        chainName: reefMainnet.name,
        nativeCurrency: reefMainnet.nativeCurrency,
        rpcUrls: reefMainnet.rpcUrls.default.http,
        blockExplorerUrls: [reefMainnet.blockExplorers.default.url],
      },
    ],
  });
};
