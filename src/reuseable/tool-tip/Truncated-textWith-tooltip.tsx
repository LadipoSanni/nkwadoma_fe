import React, { useRef, useState, useEffect } from 'react';
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
  maxWidth?: string;
}

const TruncatedTextWithTooltip: React.FC<TruncatedTextWithTooltipProps> = ({
  text,
  className = '',
  tooltipContentClassName = '',
  maxWidth = '200px',
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const element = textRef.current;
        setIsTruncated(element.scrollWidth > element.clientWidth);
      }
    };

    checkTruncation();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkTruncation);
      return () => window.removeEventListener('resize', checkTruncation);
    }
  }, [text]);

  const content = (
    <div
      ref={textRef}
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

  if (!isTruncated) {
    return content;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent 
          className={`text-black py-2 shadow-md text-[13px] bg-[#EEF5FF] ${tooltipContentClassName}`}
          style={{
            maxWidth: maxWidth,
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            zIndex: 3000
          }}
        >
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TruncatedTextWithTooltip;