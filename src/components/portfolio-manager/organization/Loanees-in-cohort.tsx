'use client'
import React,{useState} from 'react'
import SearchInput from "@/reuseable/Input/SearchInput";
// import { useDebounce } from '@/hooks/useDebounce';
// import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
// import {setLoaneeId} from "@/redux/slice/organization/organization";
// import { store } from '@/redux/store';
// import { useRouter } from 'next/navigation';
// import {formatAmount} from '@/utils/Format';

function LoaneesInCohort() {
   const [searchTerm, setSearchTerm] = useState("");
  return (
    <main>
       <div>
       <SearchInput
                    testId='search-input'
                    id="SearchLoanee"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style="md:w-20 w-full"
         /> 
       </div>
    </main>
  )
}

export default LoaneesInCohort
