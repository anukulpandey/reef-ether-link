import Header from '@/components/reef/Header';
import PortfolioSummary from '@/components/reef/PortfolioSummary';
import AssetTabs from '@/components/reef/AssetTabs';
import ActivityPanel from '@/components/reef/ActivityPanel';
import { useAccount } from 'wagmi';
import UiKit from '@reef-chain/ui-kit';

const Index = () => {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {isConnected ? (
          <>
            {/* Portfolio Summary */}
            <section className="mb-8">
              <PortfolioSummary
                totalBalance={158499.53}
                availableBalance={158499.53}
                stakedBalance={0}
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
          <div className="relative overflow-hidden rounded-3xl bg-[#f2eff8] px-10 py-16 text-center shadow-sm">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-[#a93185]/20 to-[#5d3bad]/20 blur-2xl" />
            <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-gradient-to-br from-[#5d3bad]/20 to-[#a93185]/20 blur-2xl" />
            <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center">
              <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/70 shadow-sm overflow-hidden">
                
                <UiKit.ReefIcon className="h-10 w-10 text-[#7a3bbd] relative z-10" />
              </div>
              <h2 className="text-3xl font-semibold text-[#1b1530]">Welcome to Reef Wallet</h2>
              <p className="mt-2 text-base text-[#8e899c]">
                Connect your wallet to view balances, activity, and manage your assets.
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-[#8e899c]">
                <span className="rounded-full bg-white/70 px-3 py-1">Secure</span>
                <span className="rounded-full bg-white/70 px-3 py-1">Non‑custodial</span>
                <span className="rounded-full bg-white/70 px-3 py-1">Testnet ready</span>
              </div>
            </div>
            <UiKit.Bubbles amount={10} delay={0.2} className="absolute inset-0 opacity-60" />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
