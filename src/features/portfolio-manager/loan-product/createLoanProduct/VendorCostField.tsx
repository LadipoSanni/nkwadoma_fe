interface VendorCostFieldProps {
    value: string;
    onChange: (value: string) => void;
  }
  
  const VendorCostField: React.FC<VendorCostFieldProps> = ({ value, onChange }) => {
    const formatNumberWithCommas = (value: string | number) => {
      const stringValue = typeof value === "number" ? value.toString() : value;
      return stringValue?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let rawValue = e.target.value.replace(/,/g, '');
      rawValue = rawValue.replace(/[^0-9]/g, '').replace(/^0+/, '');
      
      if (rawValue.length > 16) return;
    
      onChange(rawValue);
      
      e.target.value = formatNumberWithCommas(rawValue);
    };
  
    return (
      <input
        value={formatNumberWithCommas(value)}
        onChange={handleChange}
        className="w-full p-3 h-[3.2rem] border rounded focus:outline-none mb-2"
        placeholder="0"
      />
    );
  };

  export default VendorCostField