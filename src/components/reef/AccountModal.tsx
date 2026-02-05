 import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
 import { Button } from '@/components/ui/button';
 import { Switch } from '@/components/ui/switch';
 import { Copy, ExternalLink, X, Globe } from 'lucide-react';
 import { useToast } from '@/hooks/use-toast';
 import { mockAccount } from '@/lib/mockData';
 
 interface AccountModalProps {
   isOpen: boolean;
   onClose: () => void;
   address?: string;
 }
 
 const AccountModal = ({ isOpen, onClose, address }: AccountModalProps) => {
   const { toast } = useToast();
 
   const copyToClipboard = (text: string, label: string) => {
     navigator.clipboard.writeText(text);
     toast({
       title: 'Copied!',
       description: `${label} copied to clipboard`,
     });
   };
 
   const truncateAddress = (addr: string, start = 6, end = 4) => {
     if (!addr) return '';
     return `${addr.slice(0, start)}...${addr.slice(-end)}`;
   };
 
   return (
     <Dialog open={isOpen} onOpenChange={onClose}>
       <DialogContent className="max-w-md bg-card rounded-2xl border-0 p-0 overflow-hidden">
         {/* Header */}
         <div className="p-4 border-b border-border">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
               <Button
                 variant="outline"
                 size="sm"
                 className="rounded-full flex items-center gap-2 border-primary text-primary"
               >
                 <div className="w-4 h-4 rounded-full bg-gradient-to-br from-reef-purple to-reef-pink" />
                 Browser Extension
               </Button>
             </div>
           </div>
 
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <Globe className="w-4 h-4" />
               Choose Language
             </div>
             <div className="flex items-center gap-2">
               <span className="text-sm text-muted-foreground">Mainnet</span>
               <Switch />
               <span className="text-sm font-medium text-primary">Testnet</span>
             </div>
           </div>
         </div>
 
         {/* Account Card */}
         <div className="p-4">
           <div className="bg-muted rounded-xl p-4">
             <div className="flex items-start gap-4">
               {/* Avatar */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-reef-purple via-reef-pink to-accent flex-shrink-0" />
 
               {/* Account Info */}
               <div className="flex-1 min-w-0">
                 <h4 className="font-semibold text-foreground mb-2">{mockAccount.name}</h4>
 
                 {/* Native Address */}
                 <div className="flex items-center gap-2 mb-1">
                   <span className="text-xs text-muted-foreground">Native:</span>
                   <span className="text-xs font-mono text-foreground">
                     {truncateAddress(mockAccount.nativeAddress, 20, 3)}
                   </span>
                   <button
                     onClick={() => copyToClipboard(mockAccount.nativeAddress, 'Native address')}
                     className="text-muted-foreground hover:text-foreground"
                   >
                     <Copy className="w-3 h-3" />
                   </button>
                 </div>
 
                 {/* EVM Address */}
                 <div className="flex items-center gap-2 mb-2">
                   <span className="text-xs text-muted-foreground">EVM:</span>
                   <span className="text-xs font-mono text-foreground">
                     {address ? truncateAddress(address) : truncateAddress(mockAccount.evmAddress)}
                   </span>
                   <button
                     onClick={() => copyToClipboard(address || mockAccount.evmAddress, 'EVM address')}
                     className="text-muted-foreground hover:text-foreground"
                   >
                     <Copy className="w-3 h-3" />
                   </button>
                 </div>
 
                 <a
                   href={`https://testnet.reefscan.com/account/${address || mockAccount.evmAddress}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-xs text-primary hover:underline flex items-center gap-1"
                 >
                   Open in Explorer
                   <ExternalLink className="w-3 h-3" />
                 </a>
               </div>
 
               {/* QR Code placeholder */}
               <div className="w-16 h-16 bg-card rounded-lg border border-border flex items-center justify-center">
                 <div className="w-12 h-12 bg-foreground/10 rounded" />
               </div>
             </div>
 
             <Button
               className="w-full mt-4 bg-gradient-to-r from-reef-purple to-reef-pink text-white rounded-full"
               onClick={onClose}
             >
               Select
             </Button>
           </div>
         </div>
       </DialogContent>
     </Dialog>
   );
 };
 
 export default AccountModal;