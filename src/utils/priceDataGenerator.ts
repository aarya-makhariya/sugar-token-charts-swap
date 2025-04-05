
// Base price for sugar in India (INR per kg)
const BASE_INDIAN_SUGAR_PRICE = 38; // Average price in INR

// Mock data generator for sugar price based on Indian sugar prices
export const generateMockPriceData = (timeFrame: string) => {
  const now = new Date();
  const data = [];
  let points = 24;
  let interval = 60 * 60 * 1000; // 1 hour in milliseconds
  let priceVolatility = 0.05;
  let basePrice = 0.45; // Base price for SUGARByte token in INR
  
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

export const BASE_SUGAR_PRICE = BASE_INDIAN_SUGAR_PRICE;
