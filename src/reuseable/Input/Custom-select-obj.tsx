import React, { useState} from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup } from '@/components/ui/select';
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { Form, Formik, Field, FormikHelpers } from "formik";
import { inter } from "@/app/fonts"
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import * as Yup from "yup";
import { formatPlaceName } from "@/utils/GlobalMethods";

type SelectOption = {
  value: string | number;
  label: string;
};

type InitialValuesType = {
  name: string;
};

type Props = {
  id?: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  selectContent?: Array<SelectOption>;
  name?: string;
  placeHolder?: string;
  triggerId?: string;
  isItemDisabled?: (item: string | number) => boolean;
  readonly?: boolean;
  testId?: string;
  showAddField?: boolean;
};

function CustomSelectObj({ value, onChange, className, selectContent, name, placeHolder, id, triggerId, isItemDisabled, readonly, testId = "testId", showAddField }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownOpen = (open: boolean) => {
    setDropdownOpen(open);
  };


  const initialFormValue = { name: "" };

  const handleSubmit = (
    values: typeof initialFormValue, 
    { resetForm }: FormikHelpers<InitialValuesType>
  ) => {
    const trimmed = values.name.trim();
    if (trimmed) {
      onChange(trimmed); 
      setDropdownOpen(false);
      resetForm();
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Required")    
  });

  const handleItemClick = (itemValue: string) => {
    onChange(itemValue);
    setDropdownOpen(false); 
  };


  return (
    <div>
      <Select
        name={name}
        value={value}
        onValueChange={handleItemClick}
        onOpenChange={handleDropdownOpen}
        disabled={readonly}
        open={dropdownOpen}
      >
        <SelectTrigger
          id={triggerId}
          className={`min-w-0 h-[3.2rem] w-full border focus:ring-0 focus:outline-none shadow-none flex justify-between ${className}`}
          role='button'
          data-testid={testId}
        >
          <SelectValue className='' data-testid='SelectContent' placeholder={placeHolder} id={`selectId${id}`}>
            {value}
          </SelectValue>
          <div className=''>
            {dropdownOpen ? (
              <ChevronUpIcon data-testid="ChevronUpIcon" id='chevronUp' className="h-4 font-semibold" />
            ) : (
              <ChevronDownIcon data-testid="ChevronDownIcon" id='chevronDown' className="h-4 font-semibold" />
            )}
          </div>
        </SelectTrigger>
        <SelectContent
          id='generalSelectContent'
          className='border-none border-[#FAFBFC] text-[#404653] text-sm max-h-80'
          style={{ zIndex: 1000 }}
        >
          <SelectGroup className='selectgroup max-h-36 overflow-y-auto'>
            {selectContent?.map((content, index) => (
             <div key={`${content.value}-${content.label}-${index}`} id={`${content.value}`}>
             <SelectItem
               key={`${content.value}-${content.label}-${index}`}
               id={`${content.value}`}
               value={String(content.value)}
               className={`${content.value} hover:bg-[#EEF5FF]`}
               disabled={isItemDisabled ? isItemDisabled(content.value) : false}
             >
               {content.label}
             </SelectItem>
           </div>
            ))}
          </SelectGroup>

         {showAddField && (
          <div className='border-solid border-t-[1px] pt-3 mt-2 border-black border-opacity-30 px-2'>
            <Formik
              initialValues={initialFormValue}
              validateOnMount={true}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ setFieldValue, isValid, values}) => { 
                const shouldDisableButton = !isValid || !values.name.trim();

                return (
                  <Form className={`${inter.className}`}>
                    <div>
                      <Label htmlFor="other">Other</Label>  
                      <div className='flex items-center justify-center gap-2 mb-2'>
                        <Field
                          id="name"
                          data-testid="otherField"
                          name="name"
                          value={values.name}
                          className="w-full p-3 border rounded focus:outline-none mt-2 text-sm"
                          placeholder="Enter option"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = e.target.value;
                            const formattedValue = formatPlaceName(value, true);
                            const cleanedValue = formattedValue.replace(/[^a-zA-Z0-9'_&\-\s]/g, '');
                            if (cleanedValue.length > 0 && !/^[a-zA-Z0-9]/.test(cleanedValue)) {
                              setFieldValue("name", cleanedValue.substring(1));
                            } else {
                              setFieldValue("name", cleanedValue);
                            }
                          }}
                          onKeyDown={(e: React.KeyboardEvent) => {
                            e.stopPropagation();
                          }}
                        />
                        <Button
                          className={`h-11 w-24 relative top-1 ${shouldDisableButton ? 'bg-[#D7D7D7] hover:bg-[#D7D7D7] text-meedlWhite cursor-not-allowed' : 'bg-meedlBlue text-meedlWhite cursor-pointer'}`}
                          variant={"secondary"}
                          type={"submit"}
                          disabled={shouldDisableButton}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
         )}
        </SelectContent>
      </Select>
    </div>
  );
}

export default CustomSelectObj;