import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const multiSelectVariants = cva("m-1 bg-[#F6F6F6]", {
  variants: {
    variant: {
      default:
        "h-7 text-foreground bg-[#F6F6F6] hover:bg-[#F6F6F6] font-normal",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface MultiSelectTriggerProps
  extends VariantProps<typeof multiSelectVariants> {
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  selectedValues: string[];
  placeholder?: string;
  animation?: number;
  onToggleOption: (value: string) => void;
  isOpen: boolean;
  className?: string;
  selectButtonId?: string;
  horizontalScroll?: boolean;
}

export const MultiSelectTrigger = React.forwardRef<
  HTMLButtonElement,
  MultiSelectTriggerProps
>(
  (
    {
      options,
      selectedValues,
      variant,
      placeholder = "Select options",
      animation = 0,
      onToggleOption,
      isOpen,
      className,
      selectButtonId,
      horizontalScroll = false,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        type="button"
        id={selectButtonId}
        ref={ref}
        className={cn(
          "flex w-full p-1 rounded-md border min-h-12 h-auto items-center justify-between bg-inherit shadow-none",
          className
        )}
        {...props} 
      >
        {selectedValues.length > 0 ? (
          <div className="flex justify-between items-center w-full">
            <div 
            // className="flex flex-wrap items-center gap-1 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            className={cn(
              "flex items-center gap-1",
              horizontalScroll
                ? "overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                : "flex-wrap"
            )}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            >
              {selectedValues.map((value) => {
                const option = options.find((o) => o.value === value);
                const IconComponent = option?.icon;
                return (
                  <Badge
                    key={value}
                    className={cn(multiSelectVariants({ variant }))}
                    style={{ animationDuration: `${animation}s` }}
                    // onClick={(event) => event.stopPropagation()} 
                  >
                    {IconComponent && <IconComponent className="h-4 w-4 mr-2" />}
                    {option?.label}
                    <XIcon
                      className="ml-2 h-4 w-4 cursor-pointer text-[#939CB0]"
                      onClick={(event) => {
                        event.stopPropagation(); 
                        onToggleOption(value);
                      }}
                    />
                  </Badge>
                );
              })}
            </div>
            <div className="flex items-center justify-between">
              {isOpen ? (
                <ChevronUp className="h-4 mx-2 cursor-pointer text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full mx-auto">
            <span className="text-sm text-muted-foreground mx-3">
              {placeholder}
            </span>
            {isOpen ? (
              <ChevronUp className="h-4 mx-2 cursor-pointer text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
            )}
          </div>
        )}
      </Button>
    );
  }
);

MultiSelectTrigger.displayName = "MultiSelectTrigger";