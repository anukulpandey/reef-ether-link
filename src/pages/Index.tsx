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
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-reef-purple to-reef-pink flex items-center justify-center mb-6">
              <UiKit.ReefIcon className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to Reef</h2>
            <p className="text-muted-foreground mb-6">Connect your wallet to get started</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
