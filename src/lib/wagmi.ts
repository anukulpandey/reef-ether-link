 import { http, createConfig } from 'wagmi';
 import { defineChain } from 'viem';
 import { metaMask } from 'wagmi/connectors';
 
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
      http: ['http://34.123.142.246:8545/'],
    },
   },
   blockExplorers: {
     default: { name: 'Reef Explorer', url: 'https://reefscan.com' },
   },
 });
 
 export const config = createConfig({
   chains: [reefMainnet],
   connectors: [
     metaMask(),
   ],
   transports: {
     [reefMainnet.id]: http(),
   },
 });
