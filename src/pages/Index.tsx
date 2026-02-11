import Header from '@/components/reef/Header';
import PortfolioSummary from '@/components/reef/PortfolioSummary';
import AssetTabs from '@/components/reef/AssetTabs';
import ActivityPanel from '@/components/reef/ActivityPanel';
import { useAccount } from 'wagmi';
import UiKit from '@reef-chain/ui-kit';
import { mockTokens } from '@/lib/mockData';
import { reefMainnet } from '@/lib/wagmi';
import { Button } from '@/components/ui/button';
import { useReefBalance } from '@/hooks/useReefBalance';

const Index = () => {
  const { address, isConnected } = useAccount();
  const { balance: reefBalance } = useReefBalance(address);

  const reefPrice = mockTokens[0].price;
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
              <h2 className="text-3xl font-semibold text-[#1b1530]">Connect to Reef App</h2>
              <p className="mt-2 text-base text-[#8e899c]">
                Connect MetaMask to view balances, activity, and manage your assets.
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-[#8e899c]">
                <span className="rounded-full bg-white/70 px-3 py-1">Secure</span>
                <span className="rounded-full bg-white/70 px-3 py-1">Non‑custodial</span>
                <span className="rounded-full bg-white/70 px-3 py-1">Mainnet ready</span>
              </div>
            </div>
            <UiKit.Bubbles className="absolute inset-0 opacity-60 pointer-events-none" />
          </div>
        )}
      </main>

      {!isConnected && (
        <footer className="fixed bottom-0 left-0 right-0 bg-[#f2f0f8] border-t border-border px-6 py-3">
          <Button
            className="rounded-full bg-white/70 text-[#5d3bad] hover:bg-white/90 shadow-sm text-sm font-medium px-4 py-2 h-auto"
            variant="ghost"
            onClick={async () => {
              const provider = (window as any).ethereum;
              if (!provider) return;
              await provider.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: `0x${reefMainnet.id.toString(16)}`,
                  chainName: reefMainnet.name,
                  nativeCurrency: reefMainnet.nativeCurrency,
                  rpcUrls: reefMainnet.rpcUrls.default.http,
                  blockExplorerUrls: [reefMainnet.blockExplorers.default.url],
                }],
              });
            }}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="" className="h-4 w-4 mr-1.5" />
            Add to MetaMask
          </Button>
        </footer>
      )}
    </div>
  );
};

export default Index;
