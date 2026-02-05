 import { ArrowUpRight, ArrowDownLeft, ExternalLink } from 'lucide-react';
 import { Card } from '@/components/ui/card';
 import { mockTransactions } from '@/lib/mockData';
 
 const ActivityPanel = () => {
   return (
     <Card className="bg-card rounded-2xl shadow-sm border-0 p-4">
       <div className="flex items-center justify-between mb-4">
         <h3 className="font-semibold text-foreground">Activity</h3>
         <a
           href="https://testnet.reefscan.com"
           target="_blank"
           rel="noopener noreferrer"
           className="text-sm text-primary hover:underline flex items-center gap-1"
         >
           Open Explorer
           <ExternalLink className="w-3 h-3" />
         </a>
       </div>
 
       <div className="space-y-3">
         {mockTransactions.map((tx) => (
           <div
             key={tx.id}
             className="flex items-center justify-between py-2 border-b border-border last:border-0"
           >
             <div className="flex items-center gap-3">
               <div
                 className={`w-8 h-8 rounded-full flex items-center justify-center ${
                   tx.type === 'sent'
                     ? 'bg-red-100 text-red-500'
                     : 'bg-green-100 text-green-500'
                 }`}
               >
                 {tx.type === 'sent' ? (
                   <ArrowUpRight className="w-4 h-4" />
                 ) : (
                   <ArrowDownLeft className="w-4 h-4" />
                 )}
               </div>
               <div>
                 <p className="text-sm font-medium text-foreground capitalize">{tx.type}</p>
                 <p className="text-xs text-muted-foreground">
                   {tx.date} · {tx.time}
                 </p>
               </div>
             </div>
 
             <div className="flex items-center gap-2">
               <span className={`text-sm font-medium ${tx.type === 'sent' ? 'text-red-500' : 'text-green-500'}`}>
                 {tx.type === 'sent' ? '-' : '+'}{tx.amount} {tx.symbol}
               </span>
               <div className="w-5 h-5 rounded-full bg-gradient-to-br from-reef-purple to-reef-pink flex items-center justify-center">
                 <span className="text-xs">{tx.icon}</span>
               </div>
             </div>
           </div>
         ))}
       </div>
     </Card>
   );
 };
 
 export default ActivityPanel;