import React from 'react';
import {Input} from "@/components/ui/input";
import CountrySelectPopover from "@/reuseable/select/countrySelectPopover/Index";
import {validateEntityOwnership, validateName, validateRcNumber} from "@/utils/GlobalMethods";

interface EntityData {
    name: string,
    country: string,
    rcNumber: string,
    ownership: string,
    errorMessage: string,
    entityError: string,

}
interface IndividualProps  {
    id?: number;
    updateOwner :( field: string, value: string | File| boolean,id?: number) => void
}
const Entity = ({id, updateOwner}: IndividualProps) => {
    const initialEntityDate = {
        name: '',
        country: '',
        rcNumber: '',
        ownership: '',
        entityError: '',
        errorMessage: ''

    }

    const [entityData, setEntityData] = React.useState<EntityData>(initialEntityDate)
    console.log('entityData', entityData)

    const isFormField = () => {
        return entityData.rcNumber.length > 0 && entityData.name.length > 0 && entityData.country.length > 0 && entityData.ownership.length > 0;
    }

    console.log('isFormField()', isFormField())

    const handleInputChange = ( field: string, value: string) => {
        console.log('field:', field,'value: ', value)
        setEntityData((prevState) => (
            { ...prevState, [field]: value }
        ))
        updateOwner(field, value,id)
        const response = isFormField()
        updateOwner('isFormField', response, id)
    }

        return (
        <div>
            <div className="grid gap-5">
                <div id="entityNameContainer" className="grid gap-2">
                    <label htmlFor={`entityName-`}
                           className="block text-sm font-medium text-labelBlue">
                        Entity name
                    </label>
                    <Input
                        id={`entityName-${entityData.name}`}
                        value={entityData.name}
                        onChange={(e) => {
                            const isInputValid = validateName(e.target.value)
                            if (typeof  isInputValid === "string") {
                                setEntityData((prevState) => (
                                    { ...prevState, ['entityError']: 'name' }
                                ))
                                setEntityData((prevState) => (
                                    { ...prevState, ['errorMessage']: isInputValid }
                                ))

                            }else {
                                setEntityData((prevState) => (
                                    { ...prevState, ['errorMessage']: '' }
                                ))
                                handleInputChange('name', e.target.value)
                            }
                        }}
                        placeholder="Enter name"
                        className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                    />
                    {entityData.entityError === 'name' && (
                        <p className="text-red-500 text-sm">{entityData.errorMessage }</p>
                    )}
                </div>
                <div id="countryOfIncorporationContainer" className="grid gap-2">
                    <label htmlFor={`country-`}
                           className="block text-sm font-medium text-labelBlue">
                        Country of incorporation
                    </label>
                    <CountrySelectPopover
                        selectedCountry={entityData.country}
                        onCountryChange={(value) => handleInputChange( "country", value)}
                        restrictedCountries={["US", "NG"]}
                        disableSearch={true}
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor={`rcNumber-`}
                           className="block text-sm font-medium text-labelBlue">
                        RC number
                    </label>
                    <input
                        id={`rcNumber-`}
                        value={entityData.rcNumber}
                        onChange={(e) => {
                            const value = e.target.value.replace(/^rc/i, 'RC');
                            const isInputValid = validateRcNumber(e.target.value)
                            if (typeof  isInputValid === "string") {
                                setEntityData((prevState) => (
                                    { ...prevState, ['entityError']: 'rcNumber' }
                                ))
                                setEntityData((prevState) => (
                                    { ...prevState, ['errorMessage']: isInputValid }
                                ))

                            }else if(/^\d{7}$/.test(entityData.rcNumber)){
                                setEntityData((prevState) => (
                                    { ...prevState, ['errorMessage']: '' }
                                ))
                            }
                            else{
                                setEntityData((prevState) => (
                                    { ...prevState, ['errorMessage']: '' }
                                ))
                                handleInputChange('rcNumber', value)
                            }
                        }}
                        placeholder="Enter RC number"
                        className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                    />
                    {entityData.entityError === 'rcNumber' && (
                        <p className="text-red-500 text-sm">{entityData.errorMessage }</p>
                    )}
                </div>
                        <div className="grid gap-2">
                            <label htmlFor={`ownership-}`}>
                                Ownership / Share (%)
                            </label>
                            <input
                                id={`ownership-`}
                                name="ownership"
                                type="number"
                                max="100"
                                placeholder="0"
                                value={entityData.ownership || ""}
                                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/^rc/i, 'RC');
                                    const isInputValid = validateEntityOwnership(e.target.value)
                                    if (typeof  isInputValid === "string") {
                                        setEntityData((prevState) => (
                                            { ...prevState, ['entityError']: 'ownership' }
                                        ))
                                        setEntityData((prevState) => (
                                            { ...prevState, ['errorMessage']: isInputValid }
                                        ))

                                    } else{
                                        setEntityData((prevState) => (
                                            { ...prevState, ['errorMessage']: '' }
                                        ))
                                        handleInputChange('ownership', value)
                                    }
                                }}
                                className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                            />
                            {entityData.entityError === 'ownership' && (
                                <p className="text-red-500 text-sm">{entityData.errorMessage }</p>
                            )}
                        </div>
            </div>
        </div>
    );
};

export default Entity;