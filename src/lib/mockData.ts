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
