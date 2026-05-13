import { http, createConfig } from 'wagmi';
import { defineChain } from 'viem';
import { metaMask } from 'wagmi/connectors';
import { REEF_MAINNET_EXPLORER_URL, REEF_MAINNET_RPC_TARGET } from '@/lib/reefNetwork';

const DEFAULT_REEF_RPC_URL = '/api/reef-rpc';
const reefRpcTransportUrl = import.meta.env.VITE_REEF_RPC_URL || DEFAULT_REEF_RPC_URL;

export const reefMainnet = defineChain({
  id: 13939,
  name: 'Reef Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Reef',
    symbol: 'REEF',
  },
  rpcUrls: {
    default: {
      http: [REEF_MAINNET_RPC_TARGET],
    },
  },
  blockExplorers: {
    default: { name: 'Reef Explorer', url: REEF_MAINNET_EXPLORER_URL },
  },
});

export const config = createConfig({
  chains: [reefMainnet],
  connectors: [metaMask()],
  transports: {
    [reefMainnet.id]: http(reefRpcTransportUrl),
  },
});
