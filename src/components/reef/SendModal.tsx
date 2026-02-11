import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { type Token } from '@/lib/mockData';
import { useBalanceVisibility } from '@/contexts/BalanceVisibilityContext';
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, isAddress } from 'viem';
import { Loader2, ArrowUpRight } from 'lucide-react';
import UiKit from '@reef-chain/ui-kit';

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

  const formatBalance = (val: number) =>
    new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-[#f6f3fb] rounded-3xl border-0 p-0 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/70 shadow-sm flex items-center justify-center">
              {token.icon === 'reef' ? (
                <UiKit.ReefIcon className="h-6 w-6 text-[#7a3bbd]" />
              ) : (
                <span className="text-lg">{token.icon}</span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#1b1530]">Send {token.symbol}</h2>
              <p className="text-xs text-[#8e899c]">Transfer tokens to another address</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 space-y-4">
          {/* Amount Card */}
          <div className="bg-white/70 rounded-2xl p-4 shadow-sm border border-[#ebe6f4]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[#8e899c] uppercase tracking-wide">Amount</span>
              <button
                onClick={handleMax}
                disabled={isProcessing}
                className="text-xs font-semibold text-[#a93185] hover:text-[#8f2fb4] transition-colors disabled:opacity-50"
              >
                MAX
              </button>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isProcessing}
                className="flex-1 bg-transparent text-2xl font-semibold text-[#1b1530] placeholder:text-[#c5c0d0] outline-none disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <div className="flex items-center gap-1.5 rounded-full bg-[#f1edf8] px-3 py-1.5">
                {token.icon === 'reef' ? (
                  <UiKit.ReefIcon className="h-4 w-4 text-[#7a3bbd]" />
                ) : (
                  <span className="text-sm">{token.icon}</span>
                )}
                <span className="text-sm font-semibold text-[#1b1530]">{token.symbol}</span>
              </div>
            </div>
            <p className="text-xs text-[#8e899c] mt-2">
              Balance: {showBalances ? `${formatBalance(token.balance)} ${token.symbol}` : '••••••'}
            </p>
          </div>

          {/* Recipient Card */}
          <div className="bg-white/70 rounded-2xl p-4 shadow-sm border border-[#ebe6f4]">
            <span className="text-xs font-medium text-[#8e899c] uppercase tracking-wide mb-2 block">Recipient</span>
            <input
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              disabled={isProcessing}
              className="w-full bg-transparent text-sm font-medium text-[#1b1530] placeholder:text-[#c5c0d0] outline-none font-mono disabled:opacity-50"
            />
          </div>

          {/* Send Button */}
          <Button
            className="w-full rounded-2xl py-6 text-base font-semibold bg-gradient-to-r from-[#a93185] to-[#5d3bad] text-white shadow-md hover:shadow-lg transition-shadow"
            onClick={handleSend}
            disabled={!recipient || !amount || isProcessing}
          >
            {isSending ? (
              <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Waiting for approval...</>
            ) : isConfirming ? (
              <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Confirming on chain...</>
            ) : (
              <><ArrowUpRight className="w-5 h-5 mr-2" /> Send {token.symbol}</>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendModal;
