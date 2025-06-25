import React from 'react';
import LoanApplicationDetails from "@/features/onboarding/stepContent/loanApplicationDetails/Index";
import IdentityVerification from "@/features/onboarding/stepContent/identityVerification/Index";
import CurrentInformation from "@/features/onboarding/stepContent/currentInformation/Index";
import ConfirmLoanReferralAcceptance from "@/features/onboarding/stepContent/confirmLoanReferralAcceptance/Index";

interface StepContentProps {
    step: number;
    setCurrentStep: (step: number) => void;
    loaneeLoanDetail: LoaneeLoanDetail;
}
export interface LoaneeLoanDetail {
    tuitionAmount: string;
    loanAmountRequested: string;
    initialDeposit: string;
    cohortStartDate: string;
    referredBy: string
    loaneeLoanBreakdowns: { itemName: string; itemAmount: number }[];
}

const StepContent: React.FC<StepContentProps> = ({ step, setCurrentStep, loaneeLoanDetail }) => {

    switch (step) {
        case 0:
            return <LoanApplicationDetails loaneeLoanDetail={loaneeLoanDetail}/>;
        case 1:
            return <IdentityVerification/>;
        case 2:
            return <CurrentInformation setCurrentStep={setCurrentStep}/>;
        case 3:
            return <ConfirmLoanReferralAcceptance />;
        default:
            return null;
    }
};

export default StepContent;


// "use client"

// import type React from "react"
// import { useState, useRef, useEffect } from "react"
// import usePlacesAutocomplete from "use-places-autocomplete"
// import { Input } from "@/components/ui/input"

// interface GoogleLocationSearchProps {
//   setAddress: (address: string | null) => void
//   address: string | null
//   error?: boolean
//   helperText?: string
// }

// const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
//   return new Promise<void>((resolve, reject) => {
//     // Check if Google Maps is already loaded
  

//     // Check if script is already being loaded
//     const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
//     if (existingScript) {
//       existingScript.addEventListener("load", () => resolve())
//       existingScript.addEventListener("error", () => reject(new Error("Google Maps script failed to load.")))
//       return
//     }

//     const script = document.createElement("script")
//     script.src = https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places
//     script.async = true
//     script.defer = true
//     script.onload = () => resolve()
//     script.onerror = () => reject(new Error("Google Maps script failed to load."))
//     document.head.appendChild(script)
//   })
// }

// const GoogleLocationSearch: React.FC<GoogleLocationSearchProps> = ({
//   setAddress,
//   address,
//   error = false,
//   helperText = "",
// }) => {
//   const [isScriptLoaded, setIsScriptLoaded] = useState(false)
//   const [showDropdown, setShowDropdown] = useState<boolean>(false)
//   const [selectedIndex, setSelectedIndex] = useState<number>(-1)
//   const inputRef = useRef<HTMLInputElement>(null)
//   const dropdownRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
//     if (!apiKey) {
//       console.error("Google Maps API key is missing")
//       return
//     }

//     loadGoogleMapsScript(apiKey)
//       .then(() => setIsScriptLoaded(true))
//       .catch((error) => console.error("Error loading Google Maps script:", error))
//   }, [])

//   const {
//     value,
//     setValue,
//     suggestions: { data },
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     requestOptions: {},
//     debounce: 300,
//     initOnMount: isScriptLoaded,
//   })

//   // Initialize value with address prop
//   useEffect(() => {
//     if (address && address !== value) {
//       setValue(address, false) // false prevents triggering new search
//     }
//   }, [address, setValue, value])

//   // Handle input changes
//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = event.target.value
//     setValue(newValue)
//     setSelectedIndex(-1)

//     // Update parent immediately for controlled input behavior
//     if (newValue !== address) {
//       setAddress(newValue || null)
//     }

//     setShowDropdown(newValue.length > 0)
//   }

//   // Handle suggestion selection
//   const handleSuggestionSelect = (suggestion: any) => {
//     setValue(suggestion.description, false) // Don't trigger new search
//     setAddress(suggestion.description)
//     setShowDropdown(false)
//     setSelectedIndex(-1)
//     clearSuggestions()

//     // Focus back to input after selection
//     if (inputRef.current) {
//       inputRef.current.focus()
//     }
//   }

//   // Handle input focus
//   const handleInputFocus = () => {
//     if (value.length > 0 && data.length > 0) {
//       setShowDropdown(true)
//     }
//   }

//   // Handle input blur
//   const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
//     // Don't hide if focus is moving to dropdown
//     if (!dropdownRef.current?.contains(event.relatedTarget as Node)) {
//       setTimeout(() => setShowDropdown(false), 150)
//     }
//   }

//   // Handle keyboard navigation
//   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (!showDropdown || data.length === 0) return

//     switch (event.key) {
//       case "ArrowDown":
//         event.preventDefault()
//         setSelectedIndex((prev) => (prev < data.length - 1 ? prev + 1 : prev))
//         break
//       case "ArrowUp":
//         event.preventDefault()
//         setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
//         break
//       case "Enter":
//         event.preventDefault()
//         if (selectedIndex >= 0 && data[selectedIndex]) {
//           handleSuggestionSelect(data[selectedIndex])
//         }
//         break
//       case "Escape":
//         setShowDropdown(false)
//         setSelectedIndex(-1)
//         break
//     }
//   }

//   // Update dropdown visibility when suggestions change
//   useEffect(() => {
//     if (data.length > 0 && value.length > 0 && isScriptLoaded) {
//       setShowDropdown(true)
//     } else {
//       setShowDropdown(false)
//     }
//   }, [data, value, isScriptLoaded])

//   return (
//     <div className="w-full relative">
//       <Input
//         placeholder="Search address"
//         ref={inputRef}
//         value={value}
//         onChange={handleInputChange}
//         onFocus={handleInputFocus}
//         onBlur={handleInputBlur}
//         onKeyDown={handleKeyDown}
//         // disabled={!isScriptLoaded}
//         className={error ? "border-red-500" : ""}
//         autoComplete="off"
//       />

//       {helperText && <p className={text-sm mt-1 ${error ? "text-red-500" : "text-gray-600"}}>{helperText}</p>}

//       {showDropdown && data.length > 0 && isScriptLoaded && (
//         <div
//           ref={dropdownRef}
//           className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
//         >
//           {data.map((suggestion, index) => (
//             <div
//               key={suggestion.place_id || index}
//               onClick={() => handleSuggestionSelect(suggestion)}
//               className={px-3 py-2 cursor-pointer hover:bg-gray-100 ${index === selectedIndex ? "bg-blue-100" : ""}}
//               onMouseEnter={() => setSelectedIndex(index)}
//             >
//               <div className="text-sm font-medium text-gray-900">
//                 {suggestion.structured_formatting?.main_text || suggestion.description}
//               </div>
//               {suggestion.structured_formatting?.secondary_text && (
//                 <div className="text-xs text-gray-500">{suggestion.structured_formatting.secondary_text}</div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* {!isScriptLoaded && <p className="text-sm text-gray-500 mt-1">Loading Google Maps...</p>} */}
//     </div>
//   )
// }

// export default GoogleLocationSearch