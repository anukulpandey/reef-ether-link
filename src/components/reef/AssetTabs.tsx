 import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 import { Card } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import TokenList from './TokenList';
 
 const AssetTabs = () => {
   return (
     <Tabs defaultValue="tokens" className="w-full">
       <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start gap-4 h-auto p-0 mb-4">
         <TabsTrigger
           value="tokens"
           className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3"
         >
           Tokens
         </TabsTrigger>
         <TabsTrigger
           value="bonds"
           className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3"
         >
           Bonds
         </TabsTrigger>
         <TabsTrigger
           value="nfts"
           className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3"
         >
           NFTs
         </TabsTrigger>
       </TabsList>
 
       <TabsContent value="tokens">
         <TokenList />
       </TabsContent>
 
       <TabsContent value="bonds">
         <Card className="bg-card rounded-2xl shadow-sm border-0 p-8 text-center">
           <p className="text-muted-foreground">No bonds available</p>
         </Card>
       </TabsContent>
 
       <TabsContent value="nfts">
         <Card className="bg-card rounded-2xl shadow-sm border-0 p-8 text-center">
           <div className="flex flex-col items-center gap-4">
             <p className="text-muted-foreground">Your wallet doesn't own any NFTs</p>
             <Button
               variant="outline"
               className="rounded-full text-primary border-primary hover:bg-primary hover:text-white"
               asChild
             >
               <a href="https://sqwid.app" target="_blank" rel="noopener noreferrer">
                 Get NFTs on Sqwid
               </a>
             </Button>
           </div>
         </Card>
       </TabsContent>
     </Tabs>
   );
 };
 
 export default AssetTabs;