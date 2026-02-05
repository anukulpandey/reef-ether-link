 import { Settings, ChevronDown } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { useAccount, useConnect, useDisconnect } from 'wagmi';
 import { metaMask } from 'wagmi/connectors';
 import { useState } from 'react';
 import AccountModal from './AccountModal';
 import UiKit from "@reef-chain/ui-kit";
 
interface HeaderProps {
  balance?: string;
}

const Header = ({ balance = '99,999,702.62' }: HeaderProps) => {
  const { address, isConnected, connector } = useAccount();
   const { connect } = useConnect();
   const { disconnect } = useDisconnect();
   const [showAccountModal, setShowAccountModal] = useState(false);
 
   return (
     <>
       <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border bg-[#f2f0f8]">
         {/* Left side - Logo and Nav */}
         <div className="flex items-center gap-8">
           {/* Reef Logo */}
           <div className="flex items-center gap-2">
             <UiKit.ReefLogo />
           </div>
         </div>
 
         {/* Right side - Wallet info */}
         <div className="flex items-center gap-4">
           {isConnected ? (
             <>
               {/* Balance display */}
              <div className="flex items-center gap-3 rounded-full bg-[#f1edf8] px-5 py-3 shadow-sm">
                  <UiKit.ReefIcon className="h-6 w-6 text-white" />
                <span className="bg-gradient-to-r from-[#a93185] to-[#5d3bad] bg-clip-text text-base font-semibold tracking-tight text-transparent">
                  {balance}
                </span>
              </div>
 
               {/* Account selector */}
              <Button
                variant="ghost"
                className="flex items-center gap-2 bg-muted rounded-full px-4 py-2 h-auto hover:bg-muted/80"
                onClick={() => setShowAccountModal(true)}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-reef-purple to-reef-pink" />
                <span className="text-sm font-medium text-foreground">Account</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
 
               {/* Settings */}
               <Button variant="ghost" size="icon" className="rounded-full">
                 <Settings className="w-5 h-5 text-muted-foreground" />
               </Button>
             </>
           ) : (
             <Button
               onClick={() => connect({ connector: metaMask() })}
               className="bg-gradient-to-r from-reef-purple to-reef-pink text-white rounded-full px-6"
             >
               Connect Wallet
             </Button>
           )}
         </div>
       </header>
 
      <AccountModal
        isOpen={showAccountModal}
        onClose={() => setShowAccountModal(false)}
        address={address}
        walletName={connector?.name}
      />
     </>
   );
 };
 
 export default Header;
