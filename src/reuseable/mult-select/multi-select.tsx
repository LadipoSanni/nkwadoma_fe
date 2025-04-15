
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  multiselectList: { label: string; value: string }[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  isSearch?: boolean;
  isSelectAll?: boolean;
  isShowButton?: boolean;
  restrictedItems?: string[];
  className?: string
};

function Multiselect({
  multiselectList,
  onValueChange,
  placeholder = "Select options...",
  isSearch,
  isSelectAll,
  isShowButton,
  restrictedItems = [],
  className
}: Props) {
  const [searchText, setSearchText] = useState("");
  const [filterOptions, setFilterOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">("bottom");
//   const [focusedOption, setFocusedOption] = useState<string | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isOptionDisabled = (value: string) => {
    if (restrictedItems.length === 0) {
      return false;
    }

    if (selectedOptions.length > 0) {
      const isSelectedItemRestricted = restrictedItems.includes(selectedOptions[0]);

      if (isSelectedItemRestricted) {
        return !restrictedItems.includes(value);
      } else {
        return value !== selectedOptions[0];
      }
    }

    return false;
  };

  const toggleOption = (value: string) => {
    if (isOptionDisabled(value)) return;
    const newOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((item) => item !== value)
      : [...selectedOptions, value];
    setSelectedOptions(newOptions);
    onValueChange(newOptions);
  };

  const toggleSelectAll = (isSelected: boolean) => {
    const newOptions = isSelected
      ? filterOptions.map((option) => option.value)
      : [];
    setSelectedOptions(newOptions);
    onValueChange(newOptions);
  };

  const handleClearSelectedOptions = () => {
    if (selectedOptions.length >= 1) {
      setSelectedOptions([]);
    }
  };

  useEffect(() => {
    const match = searchText
      ? multiselectList.filter((item) =>
          item.value.toLowerCase().includes(searchText.toLowerCase())
        )
      : multiselectList;
    setFilterOptions(match);
  }, [searchText, multiselectList]);

  useEffect(() => {
    const closeHandler = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !event.composedPath().includes(selectRef.current)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", closeHandler);
    return () => {
      document.removeEventListener("click", closeHandler);
    };
  }, []);

  useEffect(() => {
    if (isOpen && selectRef.current && dropdownRef.current) {
      const selectRect = selectRef.current.getBoundingClientRect();
      const dropdownHeight = 300; // Approximate dropdown height
      const spaceBelow = window.innerHeight - selectRect.bottom;
      const spaceAbove = selectRect.top;

      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    }
  }, [isOpen]);

  const allFilteredSelected = filterOptions.every((option) =>
    selectedOptions.includes(option.value)
  );

  return (
    <div className="relative w-full" ref={selectRef}>
      <div
        className={`${className} flex items-center justify-between p-2 border border-gray-300 rounded-md cursor-pointer bg-white w-full min-h-[3.2rem] h-auto shadow-none`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-2 flex-1">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((opt) => (
              <Badge
                key={opt}
                className={`h-7 text-foreground bg-[#F6F6F6] hover:bg-[#F6F6F6] font-normal shadow-none`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOption(opt);
                }}
              >
                {opt}
                <XIcon className="ml-2 h-4 w-4 cursor-pointer text-[#939CB0]" />
              </Badge>
            ))
          ) : (
            <span className="text-gray-400 text-[14px] text-muted-foreground">
              {placeholder}
            </span>
          )}
        </div>
        {isOpen ? (
          <FiChevronUp className="text-muted-foreground" />
        ) : (
          <FiChevronDown className="text-muted-foreground" />
        )}
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute z-50 w-full ${
            dropdownPosition === "bottom" ? "mt-1" : "mb-1 bottom-full"
          } bg-white border-gray-300 rounded-md shadow-lg border-[1px] py-3`}
          
        >
          {isSearch && (
            <div className="p-2 border-b">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 border rounded-md outline-none text-[14px]"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                autoFocus
              />
            </div>
          )}

          {isSelectAll && (
            <div className="p-2 border-b flex items-center gap-2 text-[14px]">
              <input
                type="checkbox"
                checked={allFilteredSelected && filterOptions.length > 0}
                onChange={(e) => toggleSelectAll(e.target.checked)}
                className={`border-2 border-[#D7D7D7] accent-meedlBlue rounded-md mr-2`}
              />
              <label>Select All</label>
            </div>
          )}

          <div className="max-h-60 overflow-y-auto ">
            {filterOptions.length > 0 ? (
              filterOptions.map((option) => {
                const isDisabled = isOptionDisabled(option.value);
                return (
                  <div
                    key={option.value}
                    className={`flex items-center gap-1 px-2 py-1 hover:bg-[#F4F5F5] cursor-pointer data-[state=active]:bg-[#F4F5F5] z-50${
                      isDisabled ? "opacity-50 pointer-events-none" : ""
                    } ${selectedOptions.includes(option.value) ? "" : ""}`}
                    onClick={() => !isDisabled && toggleOption(option.value)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(option.value)}
                      readOnly
                      className={`border-2 border-[#D7D7D7] accent-meedlBlue rounded-md mr-2`}
                      disabled={isDisabled}
                    />
                    <span className="text-[14px] text-[#212221] ">
                      {option.label}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="p-2 text-gray-500">No options found</div>
            )}
          </div>

          {isShowButton && (
            <div className="border-t-[1px] flex justify-between">
              {selectedOptions.length > 0 && (
                <>
                  <Button
                    type="button"
                    className="shadow-none border-none text-black hover:bg-[#F4F5F5] w-full"
                    onClick={handleClearSelectedOptions}
                  >
                    Clear
                  </Button>
                </>
              )}
              <Button
                type="button"
                className="shadow-none border-none text-black flex justify-center items-center hover:bg-[#F4F5F5] w-full"
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Multiselect;