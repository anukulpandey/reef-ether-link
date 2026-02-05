 export interface Token {
   id: string;
   name: string;
   symbol: string;
   icon: string;
   price: number;
   priceChange: number;
   balance: number;
   usdValue: number;
 }
 
 export interface Transaction {
   id: string;
   type: 'sent' | 'received';
   amount: number;
   symbol: string;
   date: string;
   time: string;
   icon: string;
 }
 
 export const mockTokens: Token[] = [
   {
     id: '1',
     name: 'Reef',
     symbol: 'REEF',
    icon: 'reef',
     price: 0.001585,
     priceChange: 5.11,
     balance: 99999702.62,
     usdValue: 158499.53,
   },
   {
     id: '2',
     name: 'Reef USD',
     symbol: 'reefUSD',
     icon: '💵',
     price: 0.001585,
     priceChange: 5.11,
     balance: 0.00,
     usdValue: 0.00,
   },
 ];
 
 export const mockTransactions: Transaction[] = [
   {
     id: '1',
     type: 'sent',
     amount: 69.02,
     symbol: 'REEF',
     date: 'Jan 30, 2025',
     time: '4:53 AM',
    icon: 'reef',
   },
   {
     id: '2',
     type: 'sent',
     amount: 69.00,
     symbol: 'REEF',
     date: 'Jan 30, 2025',
     time: '4:52 AM',
    icon: 'reef',
   },
   {
     id: '3',
     type: 'sent',
     amount: 69.00,
     symbol: 'REEF',
     date: 'Jan 30, 2025',
     time: '4:49 AM',
    icon: 'reef',
   },
   {
     id: '4',
     type: 'sent',
     amount: 69.00,
     symbol: 'REEF',
     date: 'Jan 30, 2025',
     time: '4:49 AM',
    icon: 'reef',
   },
   {
     id: '5',
     type: 'sent',
     amount: 69.00,
     symbol: 'REEF',
     date: 'Jan 30, 2025',
     time: '4:46 AM',
    icon: 'reef',
   },
 ];
 
 export const mockAccount = {
   name: 'shared',
   nativeAddress: '5HWms8xHQPWgbmzFWK5mZY9tN...5bX',
   evmAddress: '0xB2b3...aBd9',
 };
