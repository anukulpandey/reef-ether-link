 import { http, createConfig } from 'wagmi';
 import { defineChain } from 'viem';
 import { metaMask } from 'wagmi/connectors';
 
 export const reefTestnet = defineChain({
   id: 13939,
   name: 'Reef Testnet',
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
     default: { name: 'Reef Explorer', url: 'https://testnet.reefscan.com' },
   },
   testnet: true,
 });
 
 export const config = createConfig({
   chains: [reefTestnet],
   connectors: [
     metaMask(),
   ],
   transports: {
     [reefTestnet.id]: http(),
   },
 });
