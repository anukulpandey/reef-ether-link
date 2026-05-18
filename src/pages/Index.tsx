import Header from '@/components/reef/Header';
import PortfolioSummary from '@/components/reef/PortfolioSummary';
import AssetTabs from '@/components/reef/AssetTabs';
import ActivityPanel from '@/components/reef/ActivityPanel';
import ReefWaveShape from '@/components/reef/ReefWaveShape';
import { useAccount } from 'wagmi';
import UiKit from '@reef-chain/ui-kit';
import { Button } from '@/components/ui/button';
import { useReefBalance } from '@/hooks/useReefBalance';
import { useReefPrice } from '@/hooks/useReefPrice';
import { requestAddReefNetwork } from '@/lib/wallets';
import '@/components/reef/reef-wave-surface.css';

const Index = () => {
  const { address, connector, isConnected } = useAccount();
  const { balance: reefBalance, isLoading: isBalanceLoading } = useReefBalance(address);
  const { price: reefPrice } = useReefPrice();

  const totalUsdValue = reefBalance * reefPrice;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {isConnected ? (
          <>
            {/* Portfolio Summary */}
            <section className="mb-8">
              <PortfolioSummary
                totalBalance={totalUsdValue}
                availableBalance={totalUsdValue}
                stakedBalance={0}
                isLoading={isBalanceLoading}
              />
            </section>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Assets Section */}
              <div className="lg:col-span-2">
                <AssetTabs />
              </div>

              {/* Activity Panel */}
              <div className="lg:col-span-1">
                <ActivityPanel />
              </div>
            </div>
          </>
        ) : (
          <div className="reef-wave-surface rounded-3xl bg-gradient-to-r from-[#a93185] to-[#5d3bad] px-10 py-16 text-center text-white shadow-xl">
            <div className="reef-wave-surface__content mx-auto flex max-w-xl flex-col items-center">
              <div className="relative mb-6 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white/18 shadow-[0_18px_40px_rgba(48,22,95,0.22)] backdrop-blur-sm">
                <UiKit.ReefIcon className="relative z-10 h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-semibold text-white">Connect to Reef App</h2>
              <p className="mt-2 text-base text-white/85">
                Connect an EVM wallet like Zerion, MetaMask, Rabby, or another compatible browser wallet to view balances, activity, and manage your assets.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-white/90">
                <span className="rounded-full bg-white/18 px-3 py-1 backdrop-blur-sm">Secure</span>
                <span className="rounded-full bg-white/18 px-3 py-1 backdrop-blur-sm">Non-custodial</span>
                <span className="rounded-full bg-white/18 px-3 py-1 backdrop-blur-sm">Mainnet ready</span>
              </div>
            </div>
            <ReefWaveShape className="reef-wave-surface__shape" />
          </div>
        )}
      </main>

      {!isConnected && (
        <footer className="fixed bottom-0 left-0 right-0 bg-[#f2f0f8] border-t border-border px-6 py-3">
          <Button
            className="rounded-full bg-white/70 text-[#5d3bad] hover:bg-white hover:text-[#5d3bad] hover:scale-105 hover:shadow-md active:scale-95 shadow-sm text-sm font-medium px-4 py-2 h-auto transition-all duration-200 ease-out"
            onClick={async () => {
              try {
                await requestAddReefNetwork(connector);
                UiKit.notify.success({
                  message: 'Reef network added to your wallet',
                });
              } catch (error) {
                const message =
                  error instanceof Error && error.message
                    ? error.message
                    : 'Open a compatible EVM wallet and try again';

                UiKit.notify.danger({
                  message,
                });
              }
            }}
          >
            <UiKit.ReefIcon className="mr-1.5 h-4 w-4" />
            Add Reef Network
          </Button>
        </footer>
      )}
    </div>
  );
};

export default Index;
