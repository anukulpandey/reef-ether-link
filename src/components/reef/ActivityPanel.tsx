import { ArrowUpRight, ArrowDownLeft, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { mockTransactions } from '@/lib/mockData';
import UiKit from '@reef-chain/ui-kit';
 
 const ActivityPanel = () => {
   return (
    <Card className="bg-transparent rounded-2xl border-0 p-0 shadow-none">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-[#1b1530]">Activity</h3>
        <a
          href="https://testnet.reefscan.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#efe7f6] px-5 py-2 text-sm font-semibold text-[#b13c8e]"
        >
          <ExternalLink className="w-4 h-4" />
          Open Explorer
        </a>
      </div>

      <div className="rounded-3xl bg-white shadow-sm border border-[#ebe6f4]">
        {mockTransactions.map((tx, index) => (
          <div key={tx.id}>
            <div className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-[#f3f4f7]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#eef0f5] flex items-center justify-center">
                  {tx.type === 'sent' ? (
                    <ArrowUpRight className="w-6 h-6 text-[#a8a4b3]" />
                  ) : (
                    <ArrowDownLeft className="w-6 h-6 text-[#a8a4b3]" />
                  )}
                </div>
                <div>
                  <p className="text-base font-semibold text-[#1b1530]">
                    {tx.type === 'sent' ? 'Sent REEF' : 'Received REEF'}
                  </p>
                  <p className="text-sm font-medium text-[#8e899c]">
                    {tx.date} · {tx.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-base font-semibold text-[#a8a4b3]">
                  {tx.type === 'sent' ? '-' : '+'}{tx.amount}
                </span>
                <UiKit.ReefIcon className="h-5 w-5 text-[#b08ac8]/70" />
              </div>
            </div>
            {index < mockTransactions.length - 1 && (
              <div className="mx-6 h-px bg-[#ebe6f4]" />
            )}
          </div>
        ))}
      </div>
     </Card>
   );
 };
 
 export default ActivityPanel;
