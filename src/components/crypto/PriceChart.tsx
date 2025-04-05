
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateMockPriceData } from "@/utils/priceDataGenerator";
import TimeFrameSelector from "./TimeFrameSelector";
import PriceDisplay from "./PriceDisplay";
import ChartArea from "./ChartArea";

type TimeFrame = "1H" | "24H" | "7D" | "30D";

const PriceChart = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("24H");
  const [priceData, setPriceData] = useState<any[]>([]);
  const [currentPrice, setCurrentPrice] = useState<string>("0.0000");
  const [priceChange, setPriceChange] = useState<number>(0);
  const [indianSugarPrice, setIndianSugarPrice] = useState<string>("38.00");
  
  useEffect(() => {
    // Initial data load
    const initialData = generateMockPriceData(timeFrame);
    setPriceData(initialData);
    
    // Set current price from the latest data point
    if (initialData.length > 0) {
      const latestPrice = parseFloat(initialData[initialData.length - 1].price);
      const firstPrice = parseFloat(initialData[0].price);
      setCurrentPrice(latestPrice.toFixed(4));
      
      // Set current Indian sugar price
      setIndianSugarPrice(initialData[initialData.length - 1].indianPrice);
      
      // Calculate price change percentage
      const change = ((latestPrice - firstPrice) / firstPrice) * 100;
      setPriceChange(change);
    }
    
    // Update price every second to simulate real-time changes
    const intervalId = setInterval(() => {
      setPriceData(prevData => {
        // Create a copy of the previous data
        const newData = [...prevData];
        
        // Get the last price and Indian sugar price
        const lastPrice = parseFloat(newData[newData.length - 1].price);
        const lastIndianPrice = parseFloat(newData[newData.length - 1].indianPrice);
        
        // Generate a small random change for Indian sugar price (-0.5% to +0.5%)
        const indianPriceChange = (Math.random() * 0.01 - 0.005) * lastIndianPrice;
        const newIndianPrice = Math.max(30, lastIndianPrice + indianPriceChange);
        
        // Calculate new token price based on Indian sugar price
        const priceFactor = newIndianPrice / 38; // Base price of Indian sugar
        const baseSugarTokenPrice = 0.45; // Base price
        const newPrice = baseSugarTokenPrice * priceFactor * (0.98 + Math.random() * 0.04);
        
        // Update the last data point
        newData[newData.length - 1].price = newPrice.toFixed(4);
        newData[newData.length - 1].indianPrice = newIndianPrice.toFixed(2);
        
        // Update current price, Indian sugar price and change percentage
        setCurrentPrice(newPrice.toFixed(4));
        setIndianSugarPrice(newIndianPrice.toFixed(2));
        const firstPrice = parseFloat(newData[0].price);
        const priceChangePercent = ((newPrice - firstPrice) / firstPrice) * 100;
        setPriceChange(priceChangePercent);
        
        return newData;
      });
    }, 1000); // Update every second
    
    return () => clearInterval(intervalId);
  }, [timeFrame]);
  
  const handleTimeFrameChange = (newTimeFrame: TimeFrame) => {
    setTimeFrame(newTimeFrame);
    const newData = generateMockPriceData(newTimeFrame);
    setPriceData(newData);
    
    // Update current price and change
    if (newData.length > 0) {
      const latestPrice = parseFloat(newData[newData.length - 1].price);
      const firstPrice = parseFloat(newData[0].price);
      setCurrentPrice(latestPrice.toFixed(4));
      setIndianSugarPrice(newData[newData.length - 1].indianPrice);
      const change = ((latestPrice - firstPrice) / firstPrice) * 100;
      setPriceChange(change);
    }
  };
  
  const isPositiveChange = priceChange >= 0;
  
  return (
    <Card className="bg-crypto-card border-zinc-700/30">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-baseline justify-between">
          <CardTitle className="text-lg font-medium text-white">SUGARByte Price</CardTitle>
          <TimeFrameSelector 
            timeFrame={timeFrame}
            onTimeFrameChange={handleTimeFrameChange}
          />
        </div>
        
        <PriceDisplay
          currentPrice={currentPrice}
          priceChange={priceChange}
          timeFrame={timeFrame}
          indianSugarPrice={indianSugarPrice}
        />
      </CardHeader>
      
      <CardContent>
        <ChartArea 
          priceData={priceData}
          isPositiveChange={isPositiveChange}
        />
      </CardContent>
    </Card>
  );
};

export default PriceChart;
