import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TruncatedTextWithTooltipProps {
  text: string;
  className?: string;
  tooltipContentClassName?: string;
  showTooltip?: boolean;
}

const TruncatedTextWithTooltip: React.FC<TruncatedTextWithTooltipProps> = ({
  text,
  className = '',
  tooltipContentClassName = '',
  showTooltip = true,
}) => {
  
  const content = (
    <div
      className={`truncate cursor-default ${className}`}
      style={{ 
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}
    >
      {text}
    </div>
  );

  if (!showTooltip) {
    return content;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent className={`text-black py-2 shadow-md text-[13px] bg-[#EEF5FF] ${tooltipContentClassName}`}>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TruncatedTextWithTooltip;