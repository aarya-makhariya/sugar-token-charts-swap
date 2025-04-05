
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";

interface ChartAreaProps {
  priceData: any[];
  isPositiveChange: boolean;
}

const ChartArea: React.FC<ChartAreaProps> = ({ priceData, isPositiveChange }) => {
  return (
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
  );
};

export default ChartArea;
