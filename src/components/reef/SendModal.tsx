 import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { type Token } from '@/lib/mockData';
import { useBalanceVisibility } from '@/contexts/BalanceVisibilityContext';
 
 interface SendModalProps {
   isOpen: boolean;
   onClose: () => void;
   token: Token | null;
 }
 
const SendModal = ({ isOpen, onClose, token }: SendModalProps) => {
  const { toast } = useToast();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const { showBalances } = useBalanceVisibility();
 
   const handleSend = () => {
     toast({
       title: 'Transaction Simulated',
       description: `Would send ${amount} ${token?.symbol} to ${recipient.slice(0, 8)}...`,
     });
     setRecipient('');
     setAmount('');
     onClose();
   };
 
   const handleMax = () => {
     setAmount(token?.balance.toString() || '0');
   };
 
   if (!token) return null;
 
   return (
     <Dialog open={isOpen} onOpenChange={onClose}>
       <DialogContent className="max-w-md bg-card rounded-2xl border-0">
         <DialogHeader>
           <DialogTitle className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-reef-purple to-reef-pink flex items-center justify-center">
               <span className="text-sm">{token.icon}</span>
             </div>
             Send {token.symbol}
           </DialogTitle>
         </DialogHeader>
 
         <div className="space-y-4">
           {/* Recipient */}
           <div className="space-y-2">
             <Label htmlFor="recipient">Recipient Address</Label>
             <Input
               id="recipient"
               placeholder="0x..."
               value={recipient}
               onChange={(e) => setRecipient(e.target.value)}
               className="rounded-xl"
             />
           </div>
 
           {/* Amount */}
           <div className="space-y-2">
             <Label htmlFor="amount">Amount</Label>
             <div className="relative">
               <Input
                 id="amount"
                 type="number"
                 placeholder="0.00"
                 value={amount}
                 onChange={(e) => setAmount(e.target.value)}
                 className="rounded-xl pr-16"
               />
               <Button
                 type="button"
                 variant="ghost"
                 size="sm"
                 onClick={handleMax}
                 className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-primary"
               >
                 MAX
               </Button>
             </div>
            <p className="text-xs text-muted-foreground">
              Balance: {showBalances ? `${token.balance.toLocaleString()} ${token.symbol}` : '••••••'}
            </p>
           </div>
 
           {/* Actions */}
           <div className="flex gap-3 pt-4">
             <Button
               variant="outline"
               className="flex-1 rounded-full"
               onClick={onClose}
             >
               Cancel
             </Button>
             <Button
               className="flex-1 bg-gradient-to-r from-reef-purple to-reef-pink text-white rounded-full"
               onClick={handleSend}
               disabled={!recipient || !amount}
             >
               Send
             </Button>
           </div>
         </div>
       </DialogContent>
     </Dialog>
   );
 };
 
 export default SendModal;
