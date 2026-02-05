import { Eye, EyeOff } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import Uik from '@reef-chain/ui-kit';
 
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
    <div className="flex items-center gap-6">
      {/* Balance Card */}
      <Card className="flex-1 p-6 bg-transparent rounded-2xl shadow-none border-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg font-semibold text-[#2a2440]">Balance</span>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="text-[#7d7790] hover:text-[#5f5a70] transition-colors"
          >
            {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>

        <Uik.Text
          text={hideValue(formatCurrency(totalBalance))}
          type="headline"
          className="bg-gradient-to-r from-[#a93185] to-[#5d3bad] bg-clip-text text-transparent"
        />

        <div />
      </Card>

      {/* Buy Reef Card */}
      <Card className="w-[420px] h-[88px] rounded-[999px] shadow-lg border-0 bg-gradient-to-r from-[#c13aa3] to-[#6a3fb7] text-white flex items-center justify-center">
        <div className="flex items-center gap-4">
          <Uik.ReefIcon className="h-8 w-8 text-white" />
          <span className="text-2xl font-semibold">Buy Reef</span>
        </div>
      </Card>
     </div>
   );
 };
 
 export default PortfolioSummary;
