 import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
 import TokenList from './TokenList';
 
 const AssetTabs = () => {
   return (
     <Tabs defaultValue="tokens" className="w-full">
      <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start gap-4 h-auto p-0 mb-4">
        <TabsTrigger
          value="tokens"
          className="text-lg rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3"
        >
          Tokens
        </TabsTrigger>
        <TabsTrigger
          value="nfts"
          className="text-lg rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3"
        >
          NFTs
        </TabsTrigger>
      </TabsList>
 
       <TabsContent value="tokens">
         <TokenList />
       </TabsContent>
 
      <TabsContent value="nfts" className="pt-6">
        <div className="flex flex-col items-center justify-center gap-6 py-14 text-center">
          <p className="text-lg font-semibold text-[#8f8a9b]">
            Your wallet doesn't own any NFTs.
          </p>
          <Button
            className="rounded-[18px] px-12 py-7 text-lg font-semibold bg-gradient-to-b from-[#0f63e3] to-[#0a3fae] text-white shadow-[0_12px_24px_rgba(10,63,174,0.28)] transition-transform duration-200 hover:scale-[1.03] hover:opacity-95"
            asChild
          >
            <a href="https://sqwid.app" target="_blank" rel="noopener noreferrer">
              <span className="mr-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70">
                <Sparkles className="h-6 w-6" />
              </span>
              Get NFTs on Sqwid
            </a>
          </Button>
        </div>
      </TabsContent>
     </Tabs>
   );
 };
 
 export default AssetTabs;
