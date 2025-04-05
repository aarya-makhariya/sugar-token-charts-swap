
import React from 'react';
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  currentPrice: string;
  priceChange: number;
  timeFrame: string;
  indianSugarPrice: string;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ 
  currentPrice, 
  priceChange, 
  timeFrame,
  indianSugarPrice
}) => {
  const isPositiveChange = priceChange >= 0;
  
  return (
    <div className="mt-4 space-y-1">
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-white">₹{currentPrice}</span>
        <span className={cn(
          "text-sm font-medium",
          isPositiveChange ? "text-crypto-success" : "text-crypto-danger"
        )}>
          {isPositiveChange ? "+" : ""}{priceChange.toFixed(2)}%
        </span>
      </div>
      <p className="text-sm text-zinc-400">
        {timeFrame === "1H" ? "Last hour" : 
         timeFrame === "24H" ? "Last 24 hours" : 
         timeFrame === "7D" ? "Last 7 days" : "Last 30 days"}
      </p>
      <p className="text-xs text-zinc-400">
        Based on Indian sugar price: ₹{indianSugarPrice}/kg
      </p>
    </div>
  );
};

export default PriceDisplay;
