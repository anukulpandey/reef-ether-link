 import { Settings, ChevronDown } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { useAccount, useConnect, useDisconnect } from 'wagmi';
 import { metaMask } from 'wagmi/connectors';
 import { useState } from 'react';
 import AccountModal from './AccountModal';
 
 interface HeaderProps {
   balance?: string;
   accountName?: string;
 }
 
 const Header = ({ balance = '99,999,702.62', accountName = 'shared' }: HeaderProps) => {
   const { address, isConnected } = useAccount();
   const { connect } = useConnect();
   const { disconnect } = useDisconnect();
   const [showAccountModal, setShowAccountModal] = useState(false);
 
   return (
     <>
       <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
         {/* Left side - Logo and Nav */}
         <div className="flex items-center gap-8">
           {/* Reef Logo */}
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-reef-purple to-reef-pink flex items-center justify-center">
               <span className="text-white text-lg">🌊</span>
             </div>
             <span className="text-xl font-bold text-foreground">reef</span>
           </div>
 
           {/* Navigation */}
           <nav className="flex items-center gap-6">
             <button className="text-sm font-medium text-primary border-b-2 border-primary pb-1">
               Dashboard
             </button>
             <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
               Bonds
             </button>
             <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
               Validators
             </button>
           </nav>
         </div>
 
         {/* Right side - Wallet info */}
         <div className="flex items-center gap-4">
           {isConnected ? (
             <>
               {/* Balance display */}
               <div className="flex items-center gap-2 bg-muted rounded-full px-4 py-2">
                 <div className="w-5 h-5 rounded-full bg-gradient-to-br from-reef-purple to-reef-pink flex items-center justify-center">
                   <span className="text-xs text-white">🌊</span>
                 </div>
                 <span className="text-sm font-medium text-foreground">{balance}</span>
               </div>
 
               {/* Account selector */}
               <Button
                 variant="ghost"
                className="flex items-center gap-2 bg-muted rounded-full px-4 py-2 h-auto hover:bg-muted/80"
                 onClick={() => setShowAccountModal(true)}
               >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-reef-purple to-reef-pink" />
                 <span className="text-sm font-medium text-foreground">{accountName}</span>
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
       />
     </>
   );
 };
 
 export default Header;