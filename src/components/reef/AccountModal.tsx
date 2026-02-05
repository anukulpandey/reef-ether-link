import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockAccount } from '@/lib/mockData';
 
interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  address?: string;
  walletName?: string;
}

const AccountModal = ({ isOpen, onClose, address, walletName }: AccountModalProps) => {
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
      <DialogContent className="max-w-2xl bg-[#f6f3fb] rounded-3xl border-0 p-0 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/60">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full flex items-center gap-2 border-primary/60 text-primary bg-white/50"
              >
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-reef-purple to-reef-pink" />
                {walletName || 'Connected Wallet'}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Mainnet</span>
              <Switch />
              <span className="text-sm font-medium text-primary">Testnet</span>
            </div>
          </div>
        </div>

        {/* Account Card */}
        <div className="px-6 pb-6 pt-3">
          <div className="bg-white/70 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-5">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-reef-purple via-reef-pink to-accent flex-shrink-0" />
 
               {/* Account Info */}
               <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground mb-2">Account</h4>
 
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
              <div className="w-20 h-20 bg-white rounded-2xl border border-white/70 shadow-sm flex items-center justify-center">
                <div className="w-14 h-14 bg-foreground/10 rounded-lg" />
              </div>
            </div>

            <Button
              className="w-full mt-6 bg-gradient-to-r from-reef-purple to-reef-pink text-white rounded-full py-6 text-base"
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
