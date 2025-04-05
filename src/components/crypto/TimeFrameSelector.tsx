
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TimeFrame = "1H" | "24H" | "7D" | "30D";

interface TimeFrameSelectorProps {
  timeFrame: TimeFrame;
  onTimeFrameChange: (timeFrame: TimeFrame) => void;
}

const TimeFrameSelector: React.FC<TimeFrameSelectorProps> = ({ 
  timeFrame, 
  onTimeFrameChange 
}) => {
  const timeFrameOptions: TimeFrame[] = ["1H", "24H", "7D", "30D"];
  
  return (
    <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
      {timeFrameOptions.map((option) => (
        <Button
          key={option}
          variant="ghost"
          size="sm"
          onClick={() => onTimeFrameChange(option)}
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
  );
};

export default TimeFrameSelector;
