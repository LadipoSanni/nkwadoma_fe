"use client"
import React,{ useState, useRef, useEffect }  from 'react'
import { loadGoogleMapsScript } from "@/lib/google-maps";
import usePlacesAutocomplete from "use-places-autocomplete";
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';

interface GoogleLocationSearchProps {
  setAddress: (address: string | null) => void
  address: string | null
  error?: boolean
  helperText?: string
  variant?: 'input' | 'textarea';
}

const GoogleLocationsearch: React.FC<GoogleLocationSearchProps> = ({
    setAddress,
  address,
  error = false,
  helperText = "", 
  variant = 'input', 
}) => {

    const [isScriptLoaded, setIsScriptLoaded] = useState(false)
      const [showDropdown, setShowDropdown] = useState<boolean>(false)
      const [selectedIndex, setSelectedIndex] = useState<number>(-1)
      const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
      const dropdownRef = useRef<HTMLDivElement>(null)

      useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        if (!apiKey) {
            console.error("Google Maps API key is missing"); 
      return
        }

      loadGoogleMapsScript(apiKey)
      .then(() => setIsScriptLoaded(true))
      .catch((error) => console.error("Error loading Google Maps script:", error))
      },[])

        const {
            value,
            setValue,
            suggestions: { data },
            clearSuggestions,
        } = usePlacesAutocomplete({
            requestOptions: {},
            debounce: 300,
            initOnMount: isScriptLoaded,
        })

        useEffect(() => {
            if (address && address !== value) {
                setValue(address, false) 
            }
         }, [address, setValue, value])
            
    
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.target.value
    setValue(newValue)
    setSelectedIndex(-1)

    if (newValue !== address) {
      setAddress(newValue || null)
    }

    setShowDropdown(newValue.length > 0)
  }

    const handleSuggestionSelect = (suggestion: google.maps.places.AutocompletePrediction) => {
    setValue(suggestion.description, false)
    setAddress(suggestion.description)
    setShowDropdown(false)
    setSelectedIndex(-1)
    clearSuggestions()

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

    const handleInputFocus = () => {
    if (value.length > 0 && data.length > 0) {
      setShowDropdown(true)
    }
  }

   const handleInputBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!dropdownRef.current?.contains(event.relatedTarget as Node)) {
          setTimeout(() => setShowDropdown(false), 150)
        }
      }
    
     const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!showDropdown || data.length === 0) return

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        setSelectedIndex((prev) => (prev < data.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        event.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        event.preventDefault()
        if (selectedIndex >= 0 && data[selectedIndex]) {
          handleSuggestionSelect(data[selectedIndex])
        }
        break
      case "Escape":
        setShowDropdown(false)
        setSelectedIndex(-1)
        break
    }
  }

  useEffect(() => {
        if (data.length > 0 && value.length > 0 && isScriptLoaded) {
          setShowDropdown(true)
        } else {
          setShowDropdown(false)
        }
     }, [data, value, isScriptLoaded])


  return (
    <div className="w-full relative">
    {variant === 'textarea' ? (
        <Textarea
          placeholder="Search address"
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className={`w-full p-2 border rounded-md focus:outline-none  resize-none ${error ? 'border-red-500' : 'border-gray-300'} min-h-[100px]`}
          autoComplete="off"
        />
      ) : (
        <Input
          placeholder="Search address"
          ref={inputRef as React.RefObject<HTMLInputElement>}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className={error ? "border-red-500" : ""}
          autoComplete="off"
        />
      )}
   {helperText && <p className={`text-[12px] mt-1  ${error ? "text-red-500" : "text-grey400"}`}>{helperText}</p>}

   {
    showDropdown && data.length > 0 && isScriptLoaded && (
        <div
        ref={dropdownRef}
        className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
        >
        {data.map((suggestion, index) => (
            <div
            key={suggestion.place_id || index}
            onClick={() => handleSuggestionSelect(suggestion)}
            className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${index === selectedIndex ? "bg-blue-100" : ""}`}
            onMouseEnter={() => setSelectedIndex(index)}
            >
            <div
            className="text-sm font-medium text-gray-900"
            >
            {suggestion.structured_formatting?.main_text || suggestion.description}
            </div>
            {suggestion.structured_formatting?.secondary_text && (
              <div className="text-xs text-gray-500">{suggestion.structured_formatting.secondary_text}</div>
              )}
            </div>
        ))

        }

        </div>
    )
   }
    </div>
  )
}

export default GoogleLocationsearch
