import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { type Token } from '@/lib/mockData';
import { useBalanceVisibility } from '@/contexts/BalanceVisibilityContext';
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, isAddress } from 'viem';
import { Loader2 } from 'lucide-react';

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

  const {
    sendTransaction,
    data: txHash,
    isPending: isSending,
    reset,
    error: sendError,
  } = useSendTransaction();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({ hash: txHash });

  // Handle successful confirmation
  useEffect(() => {
    if (isConfirmed && txHash) {
      toast({
        title: 'Transaction Confirmed',
        description: `Sent ${amount} ${token?.symbol}. Tx: ${txHash.slice(0, 10)}...`,
      });
      setRecipient('');
      setAmount('');
      reset();
      onClose();
    }
  }, [isConfirmed]);

  // Handle errors
  useEffect(() => {
    const error = sendError || confirmError;
    if (error) {
      const msg = error.message?.includes('User rejected')
        ? 'Transaction rejected by user'
        : error.message?.split('\n')[0] || 'Transaction failed';
      toast({ title: 'Transaction Failed', description: msg, variant: 'destructive' });
      reset();
    }
  }, [sendError, confirmError]);

  const handleSend = () => {
    if (!token) return;

    if (!isAddress(recipient)) {
      toast({ title: 'Invalid Address', description: 'Please enter a valid EVM address.', variant: 'destructive' });
      return;
    }

    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      toast({ title: 'Invalid Amount', description: 'Please enter an amount greater than 0.', variant: 'destructive' });
      return;
    }

    if (numAmount > token.balance) {
      toast({ title: 'Insufficient Balance', description: `You only have ${token.balance.toLocaleString()} ${token.symbol}.`, variant: 'destructive' });
      return;
    }

    sendTransaction({
      to: recipient as `0x${string}`,
      value: parseEther(amount),
    });
  };

  const handleClose = () => {
    if (!isSending && !isConfirming) {
      setRecipient('');
      setAmount('');
      reset();
      onClose();
    }
  };

  const handleMax = () => {
    setAmount(token?.balance.toString() || '0');
  };

  if (!token) return null;

  const isProcessing = isSending || isConfirming;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
              disabled={isProcessing}
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
                disabled={isProcessing}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleMax}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-primary"
                disabled={isProcessing}
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
              onClick={handleClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-reef-purple to-reef-pink text-white rounded-full"
              onClick={handleSend}
              disabled={!recipient || !amount || isProcessing}
            >
              {isSending ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Sending...</>
              ) : isConfirming ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Confirming...</>
              ) : (
                'Send'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendModal;
