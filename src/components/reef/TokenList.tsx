 import { Button } from '@/components/ui/button';
 import { Card } from '@/components/ui/card';
import { ArrowUpRight, Coins } from 'lucide-react';
import { mockTokens, type Token } from '@/lib/mockData';
import { useState } from 'react';
import UiKit from '@reef-chain/ui-kit';
import SendModal from './SendModal';
import { useBalanceVisibility } from '@/contexts/BalanceVisibilityContext';
 
 const TokenList = () => {
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const { showBalances } = useBalanceVisibility();
 
   const handleSend = (token: Token) => {
     setSelectedToken(token);
     setSendModalOpen(true);
   };
 
   const formatNumber = (value: number) => {
     return new Intl.NumberFormat('en-US', {
       minimumFractionDigits: 2,
       maximumFractionDigits: 2,
     }).format(value);
   };
 
   const formatPrice = (value: number) => {
     return new Intl.NumberFormat('en-US', {
       style: 'currency',
       currency: 'USD',
       minimumFractionDigits: 6,
       maximumFractionDigits: 6,
     }).format(value);
   };
 
   return (
     <>
      <Card className="bg-transparent rounded-2xl shadow-none border-0 overflow-hidden">
        <div className="space-y-4">
          {mockTokens.map((token) => (
            <div
              key={token.id}
              className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm border border-[#ebe6f4] w-[92%]"
            >
              {/* Token info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  {token.icon === 'reef' ? (
                    <UiKit.ReefIcon className="h-10 w-10 text-[#7a3bbd]" />
                  ) : (
                    <span className="text-lg">{token.icon}</span>
                  )}
                </div>
                <div>
                  <div className="text-lg font-semibold text-[#1b1530] uppercase">{token.symbol}</div>
                  <div className="text-base font-medium text-[#1b1530]">
                    {formatPrice(token.price)}
                  </div>
                </div>
              </div>

              {/* Balance and actions */}
              <div className="flex items-center gap-5">
                <div className="text-right">
                  <p className="text-xl font-semibold bg-gradient-to-r from-[#a93185] to-[#5d3bad] bg-clip-text text-transparent">
                    {showBalances ? `$${formatNumber(token.usdValue)}` : '••••••'}
                  </p>
                  <p className="text-sm font-medium text-[#1b1530]">
                    {showBalances ? `${formatNumber(token.balance)} ${token.symbol}` : '••••••'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    className="rounded-[18px] px-6 py-5 text-white bg-[#8f2fb4] shadow-md hover:bg-[#7d29a0]"
                    onClick={() => handleSend(token)}
                  >
                    Send
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
 
       <SendModal
         isOpen={sendModalOpen}
         onClose={() => setSendModalOpen(false)}
         token={selectedToken}
       />
     </>
   );
 };
 
 export default TokenList;
