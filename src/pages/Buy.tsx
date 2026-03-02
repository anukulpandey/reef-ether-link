import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Uik from '@reef-chain/ui-kit';
import { useAccount, useConnect } from 'wagmi';
import { metaMask } from 'wagmi/connectors';
import { Button } from '@/components/ui/button';

const ALCHEMY_PAY_ENDPOINT = 'https://api.reefscan.com/alchemy-pay/signature';
const MIN_AMOUNT = 15;
const MAX_AMOUNT = 2000;

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'Failed to initialize purchase';
};

const Buy = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const [amount, setAmount] = useState('15');
  const [error, setError] = useState('');
  const [alchemyPayUrl, setAlchemyPayUrl] = useState<string>();
  const [isIframeLoading, setIsIframeLoading] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const requestAlchemyPayUrl = async () => {
    const numericAmount = Number(amount);
    if (Number.isNaN(numericAmount) || numericAmount < MIN_AMOUNT || numericAmount > MAX_AMOUNT) {
      setError(`Amount must be between $${MIN_AMOUNT} and $${MAX_AMOUNT}`);
      return;
    }
    if (!address) {
      setError('Connect MetaMask first');
      return;
    }

    setError('');
    setIsIframeLoading(true);
    setIsIframeLoaded(false);

    try {
      const params = new URLSearchParams({
        crypto: 'REEF',
        fiat: 'USD',
        fiatAmount: String(numericAmount),
        merchantOrderNo: `${Date.now()}${address}`,
        network: 'REEF',
      });

      const response = await fetch(`${ALCHEMY_PAY_ENDPOINT}?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`AlchemyPay request failed (${response.status})`);
      }

      const payload = await response.json();
      const redirectUrl = payload?.data;
      if (typeof redirectUrl !== 'string' || !redirectUrl) {
        throw new Error('Invalid AlchemyPay response');
      }

      setAlchemyPayUrl(redirectUrl);
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      Uik.notify.danger(message);
      setAlchemyPayUrl(undefined);
      setIsIframeLoaded(false);
      setIsIframeLoading(false);
    }
  };

  const reset = () => {
    setAlchemyPayUrl(undefined);
    setIsIframeLoaded(false);
    setIsIframeLoading(false);
    setError('');
    setAmount('15');
  };

  return (
    <div className="min-h-screen bg-[#f2f0f8]">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#7a3bbd] shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#a93185] to-[#5d3bad] p-8 text-white shadow-xl">
          <h1 className="text-3xl font-semibold">Buy Reef</h1>
          <p className="mt-2 text-white/90">Top up your Reef wallet in a few clicks.</p>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          {!alchemyPayUrl ? (
            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#524b63]">Amount (USD)</span>
                <input
                  type="number"
                  min={MIN_AMOUNT}
                  max={MAX_AMOUNT}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-xl border border-[#e8e4f1] px-4 py-3 text-[#1b1530] outline-none focus:border-[#8f2fb4]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#524b63]">Selected Address</span>
                <input
                  value={address || ''}
                  disabled
                  className="w-full rounded-xl border border-[#e8e4f1] bg-[#f7f6fb] px-4 py-3 text-[#6d6780]"
                />
              </label>

              {error && <p className="text-sm font-medium text-red-600">{error}</p>}

              {!isConnected ? (
                <Button
                  className="w-full rounded-xl bg-gradient-to-r from-[#a93185] to-[#5d3bad] text-white"
                  onClick={() => connect({ connector: metaMask() })}
                >
                  Connect Wallet
                </Button>
              ) : (
                <Button
                  className="w-full rounded-xl bg-gradient-to-r from-[#a93185] to-[#5d3bad] text-white"
                  onClick={requestAlchemyPayUrl}
                  disabled={isIframeLoading}
                >
                  {isIframeLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Preparing checkout...
                    </span>
                  ) : (
                    'Purchase'
                  )}
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className="flex justify-center rounded-2xl border border-[#e8e4f1] bg-white p-3"
                style={{ minHeight: 620 }}
              >
                {isIframeLoading && (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-[#8f2fb4]" />
                  </div>
                )}
                <iframe
                  title="AlchemyPay Ramp"
                  src={alchemyPayUrl}
                  height="580"
                  width="100%"
                  frameBorder={0}
                  style={{ display: isIframeLoaded ? 'block' : 'none', maxWidth: 800 }}
                  onLoad={() => {
                    setIsIframeLoaded(true);
                    setIsIframeLoading(false);
                  }}
                />
              </div>

              <Button
                variant="outline"
                className="w-full rounded-xl border-[#d8d1ea] text-[#5d3bad]"
                onClick={reset}
              >
                Reset
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Buy;
