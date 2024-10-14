"use client";
import React from "react";
// import { InputAdornment, TextField } from "@mui/material";
// import { SearchOutlined } from "@mui/icons-material";
// import Button from "@mui/material/Button";
// import LoanProductTable from "@/reuseable/table/LoanProductTable";
// import { loanProductData } from "@/utils/LoanProductMockData";
import {Button} from "@/components/ui/button";

function LoanProductPage() {
  // const [openModal, setOpenModal] = React.useState(false);
  // const skeletonLoader = false;
  // const handleCloseCreateModal = () => {
  //   setOpenModal(false);
  // };

//   const handleRowClick = () => {
//
// }

  // const columns = [
  //     {
  //         title: 'Loan product name',
  //         sortable: true,
  //         id: 'loanProductName'
  //     },
  //     {
  //         title: 'Loan product sponsor',
  //         sortable: true,
  //         id: 'loanProductSponsor'
  //     },
  //     {
  //         title: 'Tenor',
  //         sortable: true,
  //         id: 'tenor'
  //     },
  //     {
  //         title: 'Interest rate (%)',
  //         sortable: true,
  //         id: "interestRate"
  //     },{
  //         title: 'Cost of funds',
  //         sortable: true,
  //         id: 'costOfFund'
  //     },{
  //         title: 'No. of loanees',
  //         sortable: true,
  //         id: 'noOfLoan'
  //     },{
  //         title: 'Amount disbursed',
  //         sortable: true,
  //         id: 'AmountDisbursed'
  //     },{
  //         title: 'Amount repaid',
  //         sortable: true,
  //         id: 'AmountRepaid'
  //     },
  //     {
  //         title: 'Amount earned',
  //         sortable: true,
  //         id: 'AmountEarned'
  //     },
  // ]



  return (
    <div className={`grid grid-cols-1  place-items-center   h-full`} id="loanProductPage">
      <div className="grid rounded bg-white w-[100%] md:w-[80%] lg:fixed h-[85vh] " id='loanProductPageMainContainer'>
        <div
          className={`mr-auto ml-auto w-[96%] bg-white  place-content-end gap-2   md:flex`} id="InputContainer"
        >
          <div className={`md:w-[30%] mt-[1rem] w-[100%]`}>
            {/*<TextField*/}
            {/*  size="small"*/}
            {/*  placeholder="Search"*/}
            {/*  tabIndex={2}*/}
            {/*  // onChange={(e) => handleSearch(e.target.value)}*/}
            {/*  id={"searchLoanProduct"}*/}
            {/*  fullWidth*/}
            {/*  slotProps={{*/}
            {/*    input: {*/}
            {/*      startAdornment: (*/}
            {/*        <InputAdornment position="start">*/}
            {/*          <SearchOutlined fontSize="small" />*/}
            {/*        </InputAdornment>*/}
            {/*      ),*/}
            {/*    },*/}
            {/*  }}*/}
            {/*  variant="outlined"*/}
            {/*/>*/}
          </div>
          <Button
            id="CreateLoanProductButton"
            className=""
            // onClick={() => setOpenModal(true)}
            style={{
              backgroundColor: "#0D9B48",
              color: "white",
              width: "15%",
              height: "2.35rem",
              // "&:hover": { backgroundColor: "#0D9B48", color: "white" },
              marginTop: "1rem",
              textTransform: "none",
              // "@media (max-width: 800px)": {
              //   width: "100%",
              // },
            }}
          >
            Create loan product
          </Button>
        </div>
        <div  className={`w-[96%] bg-purple-300 mt-[1rem] h-[82%] mr-auto ml-auto`}>
                        {/*<LoanProductTable tableData={loanProductData}  handleRowClick={handleRowClick} tableHeader={columns} tableHeight={59} sx='cursor-pointer' staticColunm="loanProductName"/>*/}
                    </div>
      </div>
    </div>
  );
}

export default LoanProductPage;
