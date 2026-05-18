import { Loader2, Wallet } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useConnect, useConnectors } from 'wagmi';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getDisplayWalletConnectors, getWalletDisplayName } from '@/lib/wallets';

type WalletConnectDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
};

const WalletConnectDialog = ({
  open,
  onOpenChange,
  title = 'Connect Wallet',
  description = 'Choose an EVM wallet to use with Reef. Injected wallets like MetaMask, Zerion, Rabby, and similar extensions are supported.',
}: WalletConnectDialogProps) => {
  const connectors = useConnectors();
  const displayConnectors = useMemo(
    () => getDisplayWalletConnectors(connectors),
    [connectors],
  );
  const { connectAsync, error, isPending, reset } = useConnect();
  const [pendingConnectorId, setPendingConnectorId] = useState<string | null>(null);

  useEffect(() => {
    if (open) return;
    setPendingConnectorId(null);
    reset();
  }, [open, reset]);

  const handleConnect = async (connector: (typeof displayConnectors)[number]) => {
    setPendingConnectorId(connector.id);

    try {
      await connectAsync({ connector });
      onOpenChange(false);
    } catch {
      // `useConnect` already exposes the error state for display.
    } finally {
      setPendingConnectorId(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl border-0 bg-[#f6f3fb] p-0 shadow-2xl">
        <DialogHeader className="border-b border-[#ebe6f5] px-6 py-5 text-left">
          <DialogTitle className="text-2xl font-semibold text-[#1b1530]">{title}</DialogTitle>
          <DialogDescription className="text-sm leading-6 text-[#746d86]">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 px-6 py-5">
          {displayConnectors.length > 0 ? (
            displayConnectors.map((connector) => {
              const isCurrentAttempt = isPending && pendingConnectorId === connector.id;
              const walletName = getWalletDisplayName(connector.name);

              return (
                <Button
                  key={`${connector.id}:${connector.name}`}
                  type="button"
                  variant="ghost"
                  disabled={isPending}
                  onClick={() => handleConnect(connector)}
                  className="flex h-auto w-full items-center justify-between rounded-2xl border border-[#e7e2f0] bg-white/80 px-4 py-4 text-left shadow-sm transition hover:bg-white hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-[#f1edf8]">
                      {connector.icon ? (
                        <img
                          src={connector.icon}
                          alt=""
                          className="h-7 w-7 object-contain"
                        />
                      ) : (
                        <Wallet className="h-5 w-5 text-[#7a3bbd]" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-[#1b1530]">{walletName}</div>
                      <div className="text-xs text-[#746d86]">
                        Connect this wallet to Reef mainnet
                      </div>
                    </div>
                  </div>

                  {isCurrentAttempt ? (
                    <Loader2 className="h-4 w-4 animate-spin text-[#7a3bbd]" />
                  ) : (
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a3bbd]">
                      Connect
                    </span>
                  )}
                </Button>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-[#ddd6eb] bg-white/60 px-4 py-6 text-sm text-[#746d86]">
              No compatible EVM wallet was detected. Install or open a wallet such as MetaMask, Zerion, Rabby, or another injected browser wallet, then try again.
            </div>
          )}

          {error ? (
            <div className="rounded-2xl bg-[#fff1f1] px-4 py-3 text-sm text-[#c43d3d]">
              {error.message}
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectDialog;
