
import { useEffect } from "react";
import PriceChart from "@/components/crypto/PriceChart";
import TokenSwap from "@/components/crypto/TokenSwap";
import TokenStats from "@/components/crypto/TokenStats";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

const CryptoPage = () => {
  useEffect(() => {
    document.body.classList.add('bg-crypto-bg-dark');
    return () => {
      document.body.classList.remove('bg-crypto-bg-dark');
    };
  }, []);

  return (
    <div className="min-h-screen bg-crypto-bg-dark text-white">
      {/* Header Bar */}
      <header className="border-b border-zinc-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/sugar-token-logo.svg" 
              alt="Sugar Token" 
              className="h-8 w-8"
            />
            <span className="font-bold text-xl">Sugar Token</span>
          </Link>
          
          <Button 
            asChild
            variant="outline" 
            className="border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <Link to="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Sugar Token Exchange</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Monitor real-time price changes and swap tokens on our decentralized exchange.
          </p>
        </div>
        
        {/* Stats Cards */}
        <section className="mb-8">
          <TokenStats />
        </section>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Price Chart (2 columns wide) */}
          <div className="lg:col-span-2">
            <PriceChart />
          </div>
          
          {/* Token Swap */}
          <div>
            <TokenSwap />
          </div>
        </div>
        
        {/* How It Works Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="bg-zinc-800 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-crypto-sugar">1</span>
              </div>
              <h3 className="font-semibold text-lg">Connect Wallet</h3>
              <p className="text-zinc-400">Connect your preferred crypto wallet to get started with trading.</p>
            </div>
            
            <div className="space-y-4 relative">
              <div className="hidden md:block absolute top-8 -left-4 w-8">
                <ArrowDown className="text-zinc-600 h-4 w-4 mx-auto" />
              </div>
              <div className="bg-zinc-800 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-crypto-sugar">2</span>
              </div>
              <h3 className="font-semibold text-lg">Select Tokens</h3>
              <p className="text-zinc-400">Choose the tokens you want to swap and enter the desired amount.</p>
            </div>
            
            <div className="space-y-4 relative">
              <div className="hidden md:block absolute top-8 -left-4 w-8">
                <ArrowDown className="text-zinc-600 h-4 w-4 mx-auto" />
              </div>
              <div className="bg-zinc-800 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-crypto-sugar">3</span>
              </div>
              <h3 className="font-semibold text-lg">Confirm Swap</h3>
              <p className="text-zinc-400">Review details and confirm the transaction to complete your token swap.</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-zinc-800 mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-zinc-500">
          <p>© 2025 Sugar Token. This is a test cryptocurrency project.</p>
        </div>
      </footer>
    </div>
  );
};

export default CryptoPage;
