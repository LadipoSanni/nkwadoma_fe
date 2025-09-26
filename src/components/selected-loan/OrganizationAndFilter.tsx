"use client"
import React,{useState} from 'react';
import SearchInput from "@/reuseable/Input/SearchInput";
import OrganizationNameAndChangeButton from "@/components/selected-loan/OrganizationNameAndChangeButton";
import ProductFilter from '../loan/selected-loan/loan-request/Product-filter';
import { setSearchLoan } from '@/redux/slice/loan/selected-loan';
import { store,useAppSelector } from '@/redux/store';

export const initialFormValue = {
    selectedProgram:""
  }

const OrganizationAndFilter = () => {
    const [selectProgram, setSelectProgram] = useState('')
    const searchTerm = useAppSelector(state => state?.selectedLoan?.searchLoan)
    const handleSubmit = async (values:{selectedProgram: string}) => {
        console.log('Form submited', values)
        // setIsDropdown(false)
    
      }



      const handleSelectProgram = (programType: string) => {
        setSelectProgram(programType)
   }
 

      const dataList = [
        "Software Engineer",
        "Product Manager",
        "UX Designer",
        "QA Engineer",
        "Full Stack Developer",
        "Data Scientist",
        "Machine Learning Engineer",
        "Data Analyst",
        "Business Analyst",
        "Project Manager",
        "UX/UI Designer",
      ]


  


    return (
        <div className='md:px-3 pr-3 md:pr-0'>
        <div
            id="organzationAndFilterComponent"
            className={`grid gap-3 md:place-content-between md:grid md:mr-auto md:ml-auto  w-full h-fit  md:h-fit`}>
            <OrganizationNameAndChangeButton/>
            <div
                id="filterAndSearchComponent"
                data-testid="filterAndSearchComponent"
                className={` gap-1  mb-3 md:mb-0 md:pr-0 h-fit md:w-fit md:h-fit md:flex md:gap-3`}
            >
                <div className='relative mb-3'>
                    {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                       <MdSearch className="h-6 w-6 text-[#efefef]"/>
                    </span> */}
                    <SearchInput
                        id='searchLoan'
                        placeholder='Search'
                        style='h-[2.4rem]'
                       value={searchTerm}
                       onChange={(e)=> store.dispatch(setSearchLoan(e.target.value))}
                    />
                </div> 
                <div>
                    <ProductFilter
                        disabled={true}
                    filterName='Program'
                    dropDownFilterName='Program'
                    initialFormValue={initialFormValue}
                    placeHolder='Select Program'
                    handleFilterSubmit={handleSubmit}
                    valueName='selectedProgram'
                    valueListData={dataList}
                    selectedValue={selectProgram}
                    handleSelectedValue={handleSelectProgram}
                    />
                </div>
            </div>
        </div>
        </div>
    );
};

export default OrganizationAndFilter;