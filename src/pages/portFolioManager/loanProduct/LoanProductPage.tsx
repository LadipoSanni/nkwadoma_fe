'use client'
import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import Button from "@mui/material/Button";



function LoanProductPage() {
  const [openModal, setOpenModal] = React.useState(false);
  const skeletonLoader = false;
  const handleCloseCreateModal = () => {
      setOpenModal(false);
  };

  return (
    <div className={`grid grid-cols-1  place-items-center  h-full`}>
      <div className="grid rounded bg-white w-full h-[85vh] ">
        <div className={`mr-auto ml-auto w-[96%] place-content-end gap-2   md:flex`}>
        <div className={`md:w-[30%] mt-[1rem] w-[41%]`}>
          <TextField
            size="small"
            placeholder="Search"
            tabIndex={2}
            // onChange={(e) => handleSearch(e.target.value)}
            id={"searchLoanProduct"}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
            variant="outlined"
          />
        </div>
        <Button
                        className=''
                        onClick={() => setOpenModal(true)}
                            sx={{backgroundColor: '#0D9B48', color: 'white',height: '2.35rem',
                             "&:hover" : { backgroundColor:'#0D9B48', color: 'white' },
                            marginTop: '1rem',
                            textTransform: 'none', 
                            "@media (max-width: 800px)": {
                                width: '41%', 
                              },
                        }}
                        >
                            Create loan product
                        </Button>
        </div>
       
        LoanProductPage
      </div>
    </div>
  );
}

export default LoanProductPage;
