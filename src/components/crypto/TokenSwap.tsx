
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Token = {
  symbol: string;
  name: string;
  balance: number;
  logo: string;
};

const TokenSwap = () => {
  const [fromToken, setFromToken] = useState<Token>({
    symbol: "ETH",
    name: "Ethereum",
    balance: 1.25,
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  });

  const [toToken, setToToken] = useState<Token>({
    symbol: "SUGAR",
    name: "Sugar Token",
    balance: 1250.0,
    logo: "/sugar-token-logo.svg", // we'll create this logo
  });

  const [fromAmount, setFromAmount] = useState<string>("0.1");
  const [toAmount, setToAmount] = useState<string>("220");
  const [slippage, setSlippage] = useState<number>(0.5);

  // Mock current price
  const currentRate = 2200; // 1 ETH = 2200 SUGAR

  // Calculate toAmount when fromAmount changes
  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const calculated = (numValue * currentRate).toFixed(2);
      setToAmount(calculated);
    } else {
      setToAmount("0");
    }
  };

  // Calculate fromAmount when toAmount changes
  const handleToAmountChange = (value: string) => {
    setToAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const calculated = (numValue / currentRate).toFixed(6);
      setFromAmount(calculated);
    } else {
      setFromAmount("0");
    }
  };

  // Swap the tokens (exchange from and to)
  const handleSwapDirection = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  // Execute the swap
  const handleSwap = () => {
    const fromValueNum = parseFloat(fromAmount);
    if (isNaN(fromValueNum) || fromValueNum <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (fromValueNum > fromToken.balance) {
      toast.error(`Insufficient ${fromToken.symbol} balance`);
      return;
    }

    // Mock successful swap
    toast.success(`Swap successful! You received ${toAmount} ${toToken.symbol}`);

    // Update balances (in a real app, this would come from blockchain)
    setFromToken(prev => ({
      ...prev,
      balance: prev.balance - fromValueNum
    }));
    
    setToToken(prev => ({
      ...prev,
      balance: prev.balance + parseFloat(toAmount)
    }));
    
    // Reset input fields
    setFromAmount("");
    setToAmount("");
  };

  return (
    <Card className="bg-crypto-card border-zinc-700/30">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-white">Swap Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* From Token */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">From</span>
              <span className="text-zinc-400">
                Balance: {fromToken.balance.toFixed(4)} {fromToken.symbol}
              </span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-zinc-800/50 rounded-lg">
              <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden bg-black/20">
                <img 
                  src={fromToken.logo} 
                  alt={fromToken.symbol} 
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/200x200?text=" + fromToken.symbol;
                  }}
                />
              </div>
              <div className="flex-grow">
                <Input
                  type="text"
                  value={fromAmount}
                  onChange={(e) => handleFromAmountChange(e.target.value)}
                  className="border-none bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto text-white"
                  placeholder="0.0"
                />
              </div>
              <div className="flex-shrink-0 font-medium text-white">
                {fromToken.symbol}
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-zinc-400 hover:text-white hover:bg-zinc-800"
              onClick={() => handleFromAmountChange(fromToken.balance.toString())}
            >
              Max
            </Button>
          </div>

          {/* Swap Direction Button */}
          <div className="flex justify-center -my-1">
            <Button
              variant="ghost"
              size="icon"
              className="bg-zinc-800 hover:bg-zinc-700 rounded-full h-8 w-8"
              onClick={handleSwapDirection}
            >
              <ArrowDown className="h-4 w-4 text-zinc-400" />
            </Button>
          </div>

          {/* To Token */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">To</span>
              <span className="text-zinc-400">
                Balance: {toToken.balance.toFixed(2)} {toToken.symbol}
              </span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-zinc-800/50 rounded-lg">
              <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden bg-black/20">
                <img 
                  src={toToken.logo} 
                  alt={toToken.symbol} 
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/200x200?text=" + toToken.symbol;
                  }}
                />
              </div>
              <div className="flex-grow">
                <Input
                  type="text"
                  value={toAmount}
                  onChange={(e) => handleToAmountChange(e.target.value)}
                  className="border-none bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto text-white"
                  placeholder="0.0"
                />
              </div>
              <div className="flex-shrink-0 font-medium text-white">
                {toToken.symbol}
              </div>
            </div>
          </div>

          {/* Price Information */}
          <div className="mt-4 p-3 bg-zinc-800/30 rounded-lg">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-zinc-400">Price</span>
              <span className="text-zinc-200">
                1 {fromToken.symbol} = {currentRate.toFixed(2)} {toToken.symbol}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Slippage Tolerance</span>
              <span className="text-zinc-200">{slippage}%</span>
            </div>
          </div>

          {/* Swap Button */}
          <Button
            className="w-full bg-crypto-sugar hover:bg-crypto-sugar/90 text-white"
            size="lg"
            onClick={handleSwap}
          >
            Swap
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenSwap;
