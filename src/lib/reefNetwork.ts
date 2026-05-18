const trimTrailingSlash = (url: string) => url.replace(/\/+$/, '');

export const REEF_MAINNET_RPC_TARGET = trimTrailingSlash(
  import.meta.env.VITE_REEF_RPC_TARGET || 'https://eth.reef-node-reefdevcluster-808c46-72-60-35-83.nip.io/',
);

export const REEF_MAINNET_API_URL = trimTrailingSlash(
  import.meta.env.VITE_REEF_EXPLORER_API_URL ||
    'https://explorer-backend-sij6uw-1d3882-72-60-35-83.nip.io',
);

export const REEF_MAINNET_EXPLORER_URL = trimTrailingSlash(
  import.meta.env.VITE_REEF_EXPLORER_URL || 'https://reefscan.com',
);

export const normalizeExplorerUrl = (
  url?: string | null,
  fallbackUrl = REEF_MAINNET_EXPLORER_URL,
) => {
  if (!url) return fallbackUrl;
  return trimTrailingSlash(url);
};

const usesReefscanAccountRoute = (explorerUrl: string) => explorerUrl.includes('reefscan.com');

export const getExplorerAddressUrl = (explorerUrl: string, address?: string) => {
  const baseUrl = normalizeExplorerUrl(explorerUrl);
  if (!address) return baseUrl;

  const accountRoute = usesReefscanAccountRoute(baseUrl) ? 'account' : 'address';
  return `${baseUrl}/${accountRoute}/${encodeURIComponent(address)}`;
};

export const getExplorerTxUrl = (explorerUrl: string, txHash: string) =>
  `${normalizeExplorerUrl(explorerUrl)}/tx/${encodeURIComponent(txHash)}`;
