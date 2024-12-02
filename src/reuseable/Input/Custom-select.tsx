import React,{useState} from 'react'
import {Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup} from '@/components/ui/select'
import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";



type Props = {
  id?: string
    value?: string ,
    onChange: (value: string) => void,
    className?: string,
    selectContent: Array<string | number>,
    name?: string,
    placeHolder?: string
}

function CustomSelect({value,onChange,className,selectContent,name,placeHolder,id}: Props) {

  const [dropdownOpen, setDropdownOpen] = useState(false);

   const handleDropdownOpen = () => {
    setDropdownOpen(!dropdownOpen);
};
  return (
    <div>
      <Select
       name={name}
       value={value}
        onValueChange={(val:string) => {onChange(val)}}
        onOpenChange={handleDropdownOpen}

      >
          <SelectTrigger className={`min-w-0 h-[3.2rem] w-full border  focus:ring-0 focus:outline-none  shadow-none  flex justify-between ${className}`}
        role='button'

        >
          <SelectValue className='' data-testid='SelectContent' placeholder={placeHolder}/>
          <div className=''>
                {dropdownOpen ? (
                    <ChevronUpIcon data-testid="ChevronUpIcon" className="h-4  font-semibold"/>
                ) : (
                    <ChevronDownIcon data-testid="ChevronDownIcon" className="h-4 font-semibold"/>
                )}
            </div>
         </SelectTrigger>
           <SelectContent
         className='border-none  border-[#FAFBFC] text-[#404653]  text-sm'
         style={{zIndex:1000}}
         >
          <SelectGroup className=''>
            {selectContent.map((content,index) => (
              <SelectItem 
              key={`${content}-${index}`} 
              id={`${id}-item-${index}`}
              value={String(content)}  
              className=''
              >
                {content}
              </SelectItem>
            ))}
          </SelectGroup>
         </SelectContent>
      </Select>
    </div>
  )
}


export default CustomSelect