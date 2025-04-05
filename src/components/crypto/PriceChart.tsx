
import { useState, useEffect } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Area, 
  AreaChart
} from "recharts";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Base price for sugar in India (INR per kg)
const BASE_INDIAN_SUGAR_PRICE = 38; // Average price in INR

// Mock data generator for sugar price based on Indian sugar prices
const generateMockPriceData = (timeFrame: string) => {
  const now = new Date();
  const data = [];
  let points = 24;
  let interval = 60 * 60 * 1000; // 1 hour in milliseconds
  let priceVolatility = 0.05;
  let basePrice = 0.45; // Base price for sugar token
  
  // Adjust parameters based on timeframe
  switch (timeFrame) {
    case "1H":
      points = 60;
      interval = 60 * 1000; // 1 minute
      priceVolatility = 0.01;
      break;
    case "24H":
      points = 24;
      interval = 60 * 60 * 1000; // 1 hour
      priceVolatility = 0.05;
      break;
    case "7D":
      points = 7;
      interval = 24 * 60 * 60 * 1000; // 1 day
      priceVolatility = 0.15;
      break;
    case "30D":
      points = 30;
      interval = 24 * 60 * 60 * 1000; // 1 day
      priceVolatility = 0.3;
      break;
  }

  // Simulate Indian sugar price fluctuations
  let currentIndianPrice = BASE_INDIAN_SUGAR_PRICE;
  let currentTokenPrice = basePrice;
  
  for (let i = points; i >= 0; i--) {
    // Calculate a timestamp for this data point
    const time = new Date(now.getTime() - (i * interval));
    
    // Generate a random price movement for Indian sugar
    const indianSugarChange = (Math.random() * 2 - 1) * 0.02; // +/- 2% max change
    currentIndianPrice = Math.max(30, currentIndianPrice * (1 + indianSugarChange));
    
    // Calculate token price based on Indian sugar price (loose correlation)
    const priceFactor = currentIndianPrice / BASE_INDIAN_SUGAR_PRICE;
    currentTokenPrice = basePrice * priceFactor * (0.9 + Math.random() * 0.2); // Add some randomness
    
    // Format the time for display
    let formattedTime;
    switch (timeFrame) {
      case "1H":
        formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        break;
      case "24H":
        formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        break;
      case "7D":
      case "30D":
        formattedTime = time.toLocaleDateString([], { month: 'short', day: 'numeric' });
        break;
    }
    
    data.push({
      time: formattedTime,
      price: currentTokenPrice.toFixed(4),
      indianPrice: currentIndianPrice.toFixed(2),
      timestamp: time.getTime(),
    });
  }
  
  return data;
};

type TimeFrame = "1H" | "24H" | "7D" | "30D";

const PriceChart = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("24H");
  const [priceData, setPriceData] = useState<any[]>([]);
  const [currentPrice, setCurrentPrice] = useState<string>("0.0000");
  const [priceChange, setPriceChange] = useState<number>(0);
  const [indianSugarPrice, setIndianSugarPrice] = useState<string>(BASE_INDIAN_SUGAR_PRICE.toFixed(2));
  
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
        const priceFactor = newIndianPrice / BASE_INDIAN_SUGAR_PRICE;
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
  
  const timeFrameOptions: TimeFrame[] = ["1H", "24H", "7D", "30D"];
  
  return (
    <Card className="bg-crypto-card border-zinc-700/30">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-baseline justify-between">
          <CardTitle className="text-lg font-medium text-white">Sugar Token Price</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            {timeFrameOptions.map((option) => (
              <Button
                key={option}
                variant="ghost"
                size="sm"
                onClick={() => handleTimeFrameChange(option)}
                className={cn(
                  "h-8 px-3 text-sm",
                  timeFrame === option 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                )}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="mt-4 space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">${currentPrice}</span>
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
      </CardHeader>
      
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={priceData}
              margin={{ top: 10, right: 5, left: 5, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={isPositiveChange ? "#22c55e" : "#ef4444"} 
                    stopOpacity={0.3}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={isPositiveChange ? "#22c55e" : "#ef4444"} 
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#888', fontSize: 12 }}
              />
              <YAxis 
                domain={['auto', 'auto']}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#888', fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#222', 
                  borderColor: '#444',
                  borderRadius: '6px',
                  fontSize: '12px'
                }} 
                formatter={(value) => [`$${value}`, 'Price']}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke={isPositiveChange ? "#22c55e" : "#ef4444"} 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceChart;
