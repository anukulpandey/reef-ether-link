import { useEffect, useMemo, useState } from 'react';
import { getNetwork, network$, NetworkType, type NetworkConfig } from 'reef-evm-util-lib';
import { useReefState } from '@/contexts/ReefStateContext';
import {
  REEF_MAINNET_EXPLORER_URL,
  getExplorerAddressUrl,
  normalizeExplorerUrl,
} from '@/lib/reefNetwork';

const FALLBACK_EXPLORER_URL = REEF_MAINNET_EXPLORER_URL;

const resolveExplorerUrl = (
  selectedNetwork: string,
  network?: NetworkConfig | null,
) => {
  if (selectedNetwork === NetworkType.ReefMainnet) {
    return REEF_MAINNET_EXPLORER_URL;
  }

  return normalizeExplorerUrl(network?.blockExplorerUrl, FALLBACK_EXPLORER_URL);
};

const getCurrentExplorerUrl = (selectedNetwork: string) => {
  try {
    return resolveExplorerUrl(selectedNetwork, getNetwork());
  } catch {
    return FALLBACK_EXPLORER_URL;
  }
};

export function useReefExplorer(address?: string) {
  const { isReefReady, selectedNetwork } = useReefState();
  const [explorerUrl, setExplorerUrl] = useState(FALLBACK_EXPLORER_URL);

  useEffect(() => {
    if (!isReefReady) return;

    setExplorerUrl(getCurrentExplorerUrl(selectedNetwork));

    const subscription = network$.subscribe((network) => {
      setExplorerUrl(resolveExplorerUrl(selectedNetwork, network));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isReefReady, selectedNetwork]);

  const accountExplorerUrl = useMemo(() => {
    return getExplorerAddressUrl(explorerUrl, address);
  }, [address, explorerUrl]);

  return {
    explorerUrl,
    accountExplorerUrl,
  };
}
