
import { Card, CardContent } from "@/components/ui/card";
import { 
  CircleDollarSign, 
  TrendingUp, 
  TrendingDown,
  ChartLine
} from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, isPositive, icon }: StatCardProps) => (
  <Card className="bg-crypto-card border-zinc-700/30">
    <CardContent className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-400">{title}</p>
          <p className="text-2xl font-semibold mt-1 text-white">{value}</p>
          
          {change && (
            <p className={`text-xs mt-1 flex items-center ${isPositive ? 'text-crypto-success' : 'text-crypto-danger'}`}>
              {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {change}
            </p>
          )}
        </div>
        
        <div className="bg-zinc-800 p-2 rounded-lg">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

const TokenStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <StatCard
        title="Current Price"
        value="$0.4523"
        change="+5.23% (24h)"
        isPositive={true}
        icon={<CircleDollarSign className="h-5 w-5 text-crypto-sugar" />}
      />
      
      <StatCard
        title="Market Cap"
        value="$4,523,000"
        change="+2.8% (24h)"
        isPositive={true}
        icon={<ChartLine className="h-5 w-5 text-crypto-sugar" />}
      />
      
      <StatCard
        title="Trading Volume"
        value="$752,432"
        change="-1.2% (24h)"
        isPositive={false}
        icon={<CircleDollarSign className="h-5 w-5 text-crypto-sugar" />}
      />
    </div>
  );
};

export default TokenStats;
