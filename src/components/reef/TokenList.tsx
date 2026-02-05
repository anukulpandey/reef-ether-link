 import { Button } from '@/components/ui/button';
 import { Card } from '@/components/ui/card';
 import { Layers, ArrowUpRight } from 'lucide-react';
 import { mockTokens, type Token } from '@/lib/mockData';
 import { useState } from 'react';
 import SendModal from './SendModal';
 
 const TokenList = () => {
   const [sendModalOpen, setSendModalOpen] = useState(false);
   const [selectedToken, setSelectedToken] = useState<Token | null>(null);
 
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
       <Card className="bg-card rounded-2xl shadow-sm border-0 overflow-hidden">
         <div className="divide-y divide-border">
           {mockTokens.map((token) => (
             <div
               key={token.id}
               className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
             >
               {/* Token info */}
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-reef-purple to-reef-pink flex items-center justify-center">
                   <span className="text-lg">{token.icon}</span>
                 </div>
                 <div>
                   <div className="flex items-center gap-2">
                     <span className="font-medium text-foreground">{token.name}</span>
                     <span className="text-xs text-muted-foreground">{token.symbol}</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="text-sm text-muted-foreground">{formatPrice(token.price)}</span>
                     <span className={`text-xs ${token.priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                       {token.priceChange >= 0 ? '+' : ''}{token.priceChange}%
                     </span>
                   </div>
                 </div>
               </div>
 
               {/* Balance and actions */}
               <div className="flex items-center gap-6">
                 <div className="text-right">
                   <p className="font-medium text-foreground">${formatNumber(token.usdValue)}</p>
                   <p className="text-sm text-muted-foreground">{formatNumber(token.balance)}</p>
                 </div>
 
                 <div className="flex items-center gap-2">
                   <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                     <Layers className="w-4 h-4" />
                   </Button>
                   <Button
                     variant="outline"
                     size="sm"
                     className="rounded-full text-primary border-primary hover:bg-primary hover:text-white"
                     onClick={() => handleSend(token)}
                   >
                     Send
                     <ArrowUpRight className="w-3 h-3 ml-1" />
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