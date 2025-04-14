
"use client";
import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MultiSelectTrigger, multiSelectVariants } from "./Multi-select-trigger";
import { MultiSelectContent } from "./Multi-select-content";
import { type VariantProps } from "class-variance-authority";

interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  options: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  animation?: number;
  modalPopover?: boolean;
  className?: string;
  id?: string
  selcetButtonId?: string
  restrictedItems?: string[];
  horizontalScroll?: boolean;
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      defaultValue = [],
      placeholder = "Select options",
      animation = 0,
      modalPopover = false,
      variant,
      className,
      id,
      selcetButtonId,
      restrictedItems,
      horizontalScroll,
      ...props
     
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => triggerRef.current!);

    // const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //   if (event.key === "Enter") {
    //     setIsPopoverOpen(true);
    //   } else if (event.key === "Backspace" && !event.currentTarget.value) {
    //     const newSelectedValues = [...selectedValues];
    //     newSelectedValues.pop();
    //     setSelectedValues(newSelectedValues);
    //     onValueChange(newSelectedValues);
    //   }
    // };

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    // const handleTogglePopover = () => {
    //   setIsPopoverOpen((prev) => !prev);
    // };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value);
        setSelectedValues(allValues);
        onValueChange(allValues);
      }
    };

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
        <PopoverTrigger asChild id={"popoverId"}>
          <MultiSelectTrigger
            ref={triggerRef}
            options={options}
            selectedValues={selectedValues}
            variant={variant}
            placeholder={placeholder}
            animation={animation}
            onToggleOption={toggleOption}
            // onTogglePopover={handleTogglePopover}
            isOpen={isPopoverOpen}
            className={className}
            selectButtonId={selcetButtonId}
            horizontalScroll={horizontalScroll}
            {...props}
          />
        </PopoverTrigger>
        <PopoverContent
          ref={contentRef}
          className="w-full p-0"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
          tabIndex={-1}
          id="selectedContentId"
        >
          <MultiSelectContent
            options={options}
            selectedValues={selectedValues}
            onToggleOption={toggleOption}
            onClear={handleClear}
            onClose={() => setIsPopoverOpen(false)}
            onToggleAll={toggleAll}
            // onInputKeyDown={handleInputKeyDown}
            id={id}
            restrictedItems={restrictedItems}
            
          />
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = "MultiSelect";

// import React, { useState, useEffect, useRef } from "react";
// import { CheckIcon, ChevronDown, ChevronUp, XCircle,XIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface CustomMultiSelectProps {
//   options: { label: string; value: string }[];
//   onValueChange: (values: string[]) => void;
//   placeholder?: string;
//   className?: string;
//   condition?: boolean
//   selectAllCondition?: boolean
// }

// export const MultiSelect = ({
//   options,
//   onValueChange,
//   placeholder = "Select options",
//   className = "",
//   condition = false,
//   selectAllCondition
// }: CustomMultiSelectProps) => {
//   const [selectedValues, setSelectedValues] = useState<string[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const wrapperRef = useRef<HTMLDivElement>(null);

//   // Handle clicks outside to close the dropdown
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Handle Escape key to close
//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, []);

//   const toggleOption = (value: string) => {
//     const newSelectedValues = selectedValues.includes(value)
//       ? selectedValues.filter((v) => v !== value)
//       : [...selectedValues, value];
//     setSelectedValues(newSelectedValues);
//     onValueChange(newSelectedValues);
    
//   };

//   const toggleAll = () => {
//     if (selectedValues.length === options.length) {
//       setSelectedValues([]);
//       onValueChange([]);
//     } else {
//       const allValues = options.map((option) => option.value);
//       setSelectedValues(allValues);
//       onValueChange(allValues);
//     }
//   };

//   const clearAll = () => {
//     setSelectedValues([]);
//     onValueChange([]);
//   };

//   const handleToggleDropdown = () => {
//     setIsOpen((prev) => !prev);
//   };

//   return (
//     <div ref={wrapperRef} className={`relative w-full  ${className}`}>
//       {/* Trigger */}
//       <Button
//         type="button"
//         onClick={handleToggleDropdown}
//         className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-700 shadow-none hover:bg-gray-50 focus:outline-none h-12"
//       >
//         <div className="flex flex-wrap gap-1">
//           {selectedValues.length > 0 ? (
//             selectedValues.map((value) => {
//               const option = options.find((o) => o.value === value);
//               return (
//                 <span
//                   key={value}
//                   className="inline-flex items-center rounded bg-[#F6F6F6] px-2 py-1 text-xs text-[#212221]"
//                 >
//                   {option?.label}
//                   <XIcon
//                     className="ml-1 h-3 w-3 cursor-pointer text-[#212221]"
//                     onClick={(e) => {
//                       e.stopPropagation(); // Prevent triggering dropdown toggle
//                       toggleOption(value);
//                     }}
//                   />
//                 </span>
//               );
//             })
//           ) : (
//             <span className="opacity-35 text-[16px]">{placeholder}</span>
//           )}
//         </div>
//         {isOpen ? (
//           <ChevronUp className="h-4 w-4 text-gray-500" />
//         ) : (
//           <ChevronDown className="h-4 w-4 text-gray-500" />
//         )}
//       </Button>

//       {/* Dropdown */}
//       {isOpen && (
//         <div className="absolute  mt-1 w-full md:w-[30vh] rounded-md border border-gray-300 bg-white shadow-lg z-50" >
//           <div className="max-h-60 overflow-y-auto p-2">
//             {/* Select All */}
//             <div>
//                 {!selectAllCondition? "" :
//             <div
//               onClick={toggleAll}
//               className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-100"
//             >
//               <div
//                 className={`flex h-4 w-4 items-center justify-center rounded-sm border border-gray-400 ${
//                   selectedValues.length === options.length
//                     ? "bg-blue-500 text-white"
//                     : "bg-white"
//                 }`}
//               >
//                 {selectedValues.length === options.length && <CheckIcon className="h-3 w-3" />}
//               </div>
//               <span className="text-sm text-gray-700">(Select All)</span>
//             </div>
//         }
//             </div>
//             {/* Options */}
//             {options.map((option) => {
//               const isSelected = selectedValues.includes(option.value);
//               return (
//                 <div
//                   key={option.value}
//                   onClick={() => toggleOption(option.value)}
//                   className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-100 text-[14px]"
//                 >
//                   <div
//                     className={`flex h-4 w-4 items-center justify-center rounded-sm border border-gray-400 ${
//                       isSelected ? "bg-blue-950 text-white" : "bg-white"
//                     }`}
//                   >
//                     {isSelected && <CheckIcon className="h-3 w-3" />}
//                   </div>
//                   <span className="text-sm text-gray-700">{option.label}</span>
//                 </div>
//               );
//             })}
//           </div>

//          <div>
//             {!condition? "" :
//           <div className="flex justify-between border-t border-gray-200 p-2">
//             {selectedValues.length > 0 && (
//               <button
//                 onClick={clearAll}
//                 className="text-sm text-[#212221] focus:outline-none"
//               >
//                 Clear
//               </button>
//             )}
//             <button
//               onClick={() => setIsOpen(false)}
//               className="text-sm text-[#212221] focus:outline-none"
//             >
//               Close
//             </button>
//           </div>
// }
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };



// import * as React from "react";
// import { cva, type VariantProps } from "class-variance-authority";
// import {
//   CheckIcon,
//   XCircle,
//   ChevronDown,
//   ChevronUp,
//   XIcon,
// } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
// } from "@/components/ui/command";

// const multiSelectVariants = cva(
//   "m-1 ",
//   {
//     variants: {
//       variant: {
//         default:
//           "h-7 text-foreground bg-[#F6F6F6] hover:bg-[#F6F6F6] font-normal",
//         // secondary:
//         //   "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
//         // destructive:
//         //   "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
//         // inverted: "inverted",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   }
// );

// interface MultiSelectProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof multiSelectVariants> {
//   options: {
//     label: string;
//     value: string;
//     icon?: React.ComponentType<{ className?: string }>;
//   }[];
//   onValueChange: (value: string[]) => void;
//   defaultValue?: string[];
//   placeholder?: string;
//   animation?: number;
//   modalPopover?: boolean;
//   asChild?: boolean;
//   className?: string;
//   selectAllcondition?: boolean
// }

// export const MultiSelect = React.forwardRef<
//   HTMLButtonElement,
//   MultiSelectProps
// >(
//   (
//     {
//       options,
//       onValueChange,
//       variant,
//       defaultValue = [],
//       placeholder = "Select options",
//       animation = 0,
//       modalPopover = false,
//       asChild = false,
//       className,
//       selectAllcondition,
//       ...props
//     },
//     ref
//   ) => {
//     const [selectedValues, setSelectedValues] =
//       React.useState<string[]>(defaultValue);
//     const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
//     const [isAnimating, setIsAnimating] = React.useState(false);

    
//     const toggleOption = (option: string) => {
//       const newSelectedValues = selectedValues.includes(option)
//         ? selectedValues.filter((value) => value !== option)
//         : [...selectedValues, option];
//       setSelectedValues(newSelectedValues);
//       onValueChange(newSelectedValues);
//     };

    
//     const handleClear = () => {
//       setSelectedValues([]);
//       onValueChange([]);
//     };

    
//     const handleTogglePopover = () => {
//       setIsPopoverOpen((prev) => !prev);
//     };

    
//     const toggleAll = () => {
//       if (selectedValues.length === options.length) {
//         handleClear();
//       } else {
//         const allValues = options.map((option) => option.value);
//         setSelectedValues(allValues);
//         onValueChange(allValues);
//       }
//     };

//     return (
//       <Popover
//         open={isPopoverOpen}
//         onOpenChange={setIsPopoverOpen}
//         modal={modalPopover}
//       >
//         <PopoverTrigger asChild>
//           <Button
//             ref={ref}
//             {...props}
//             onClick={handleTogglePopover}
//             className={cn(
//               "flex w-full p-1 rounded-md border min-h-12 h-auto items-center justify-between bg-inherit shadow-none",
//               className
//             )}
//           >
//             {selectedValues.length > 0 ? (
//               <div className="flex justify-between items-center w-full">
//                 <div 
//                 className="flex flex-wrap items-center gap-1 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
//                 >
//                   {selectedValues.map((value) => {
//                     const option = options.find((o) => o.value === value);
//                     const IconComponent = option?.icon;
//                     return (
//                       <Badge
//                         key={value}
//                         className={cn(
//                           isAnimating ? "animate-bounce" : "",
//                           multiSelectVariants({ variant })
//                         )}
//                         style={{ animationDuration: `${animation}s` }}
//                       >
//                         {IconComponent && (
//                           <IconComponent className="h-4 w-4 mr-2" />
//                         )}
//                         {option?.label}
//                         <XCircle
//                           className="ml-2 h-4 w-4 cursor-pointer"
//                           onClick={(event) => {
//                             event.stopPropagation();
//                             toggleOption(value);
//                           }}
//                         />
//                       </Badge>
//                     );
//                   })}
//                 </div>
//                 <div className="flex items-center justify-between">
//                   {isPopoverOpen ? (
//                     <ChevronUp className="h-4 mx-2 cursor-pointer text-muted-foreground" />
//                   ) : (
//                     <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
//                   )}
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center justify-between w-full mx-auto">
//                 <span className="text-sm text-muted-foreground mx-3">
//                   {placeholder}
//                 </span>
//                 {isPopoverOpen ? (
//                   <ChevronUp className="h-4 cursor-pointer text-muted-foreground mx-2" />
//                 ) : (
//                   <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
//                 )}
//               </div>
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent
//           className="w-auto p-0"
//           align="start"
//           onEscapeKeyDown={() => setIsPopoverOpen(false)}
//         >
//           <Command>
//             {/* <CommandInput placeholder="Search..." /> */}
//             <CommandList>
//               <CommandEmpty>No results found.</CommandEmpty>
//               <CommandGroup>
//                 {!selectAllcondition? "" :
//                  <CommandItem
//                  key="all"
//                  onSelect={toggleAll}
//                  className="cursor-pointer"
//                >
//                  <div
//                    className={cn(
//                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
//                      selectedValues.length === options.length
//                        ? "bg-primary text-primary-foreground"
//                        : "opacity-50 [&_svg]:invisible"
//                    )}
//                  >
//                    <CheckIcon className="h-4 w-4" />
//                  </div>
//                  <span>(Select All)</span>
//                </CommandItem>
//                 }
            
//                 {options.map((option) => {
//                   const isSelected = selectedValues.includes(option.value);
//                   return (
//                     <CommandItem
//                       key={option.value}
//                       onSelect={() => toggleOption(option.value)}
//                       className="cursor-pointer"
//                     >
//                       <div
//                         className={cn(
//                           "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
//                           isSelected
//                             ? "bg-primary text-primary-foreground"
//                             : "opacity-50 [&_svg]:invisible"
//                         )}
//                       >
//                         <CheckIcon className="h-4 w-4" />
//                       </div>
//                       {option.icon && (
//                         <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
//                       )}
//                       <span>{option.label}</span>
//                     </CommandItem>
//                   );
//                 })}
//               </CommandGroup>
//               <CommandSeparator />
//               <CommandGroup>
//                 <div className="flex items-center justify-between">
//                   {selectedValues.length > 0 && (
//                     <>
//                       <CommandItem
//                         onSelect={handleClear}
//                         className="flex-1 justify-center cursor-pointer"
//                       >
//                         Clear
//                       </CommandItem>
//                       <Separator
//                         orientation="vertical"
//                         className="flex min-h-6 h-full"
//                       />
//                     </>
//                   )}
//                   <CommandItem
//                     onSelect={() => setIsPopoverOpen(false)}
//                     className="flex-1 justify-center cursor-pointer max-w-full"
//                   >
//                     Close
//                   </CommandItem>
//                 </div>
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     );
//   }
// );

// MultiSelect.displayName = "MultiSelect";