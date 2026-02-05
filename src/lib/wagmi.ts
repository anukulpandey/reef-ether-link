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
       http: ['http://reeftestnet1-reefethrpc-dab87f-72-60-35-83.traefik.me/'],
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