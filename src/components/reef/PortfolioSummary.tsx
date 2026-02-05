import { Eye, EyeOff } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import UiKit from '@reef-chain/ui-kit';
 
 interface PortfolioSummaryProps {
   totalBalance: number;
   availableBalance: number;
   stakedBalance: number;
 }
 
 const PortfolioSummary = ({
   totalBalance = 158499.53,
   availableBalance = 158499.53,
   stakedBalance = 0.00,
 }: PortfolioSummaryProps) => {
   const [showBalance, setShowBalance] = useState(true);
 
   const formatCurrency = (value: number) => {
     return new Intl.NumberFormat('en-US', {
       style: 'currency',
       currency: 'USD',
       minimumFractionDigits: 2,
     }).format(value);
   };
 
   const hideValue = (value: string) => {
     return showBalance ? value : '••••••';
   };
 
   return (
     <div className="flex gap-6">
       {/* Balance Card */}
       <Card className="flex-1 p-6 bg-card rounded-2xl shadow-sm border-0">
         <div className="flex items-center gap-2 mb-4">
           <span className="text-sm text-muted-foreground">Total balance</span>
           <button
             onClick={() => setShowBalance(!showBalance)}
             className="text-muted-foreground hover:text-foreground transition-colors"
           >
             {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
           </button>
         </div>
 
         <h2 className="text-4xl font-bold text-foreground mb-6">
           {hideValue(formatCurrency(totalBalance))}
         </h2>
 
         <div className="flex gap-8">
           <div>
             <span className="text-sm text-muted-foreground">Available</span>
             <p className="text-lg font-semibold text-foreground">
               {hideValue(formatCurrency(availableBalance))}
             </p>
           </div>
           <div>
             <span className="text-sm text-muted-foreground">Staked</span>
             <p className="text-lg font-semibold text-foreground">
               {hideValue(formatCurrency(stakedBalance))}
             </p>
           </div>
         </div>
       </Card>
 
       {/* Buy Reef Card */}
       <Card className="w-80 p-6 rounded-2xl shadow-sm border-0 bg-gradient-to-br from-reef-purple to-reef-pink text-white relative overflow-hidden">
         {/* Underwater silhouette decoration */}
         <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
         <div className="absolute bottom-2 left-4 right-4 flex justify-between items-end opacity-30">
           <div className="w-8 h-16 bg-white/20 rounded-full" />
           <div className="w-6 h-12 bg-white/20 rounded-full" />
           <div className="w-10 h-20 bg-white/20 rounded-full" />
           <div className="w-5 h-10 bg-white/20 rounded-full" />
         </div>
         
         <div className="relative z-10">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4">
            <UiKit.ReefIcon className="h-6 w-6 text-white" />
          </div>
           <h3 className="text-xl font-bold mb-2">Buy Reef</h3>
           <p className="text-sm text-white/80">
             Purchase REEF tokens directly with your credit card
           </p>
         </div>
       </Card>
     </div>
   );
 };
 
 export default PortfolioSummary;
