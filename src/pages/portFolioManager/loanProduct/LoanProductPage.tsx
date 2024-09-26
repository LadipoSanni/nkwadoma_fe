import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";



function LoanProductPage() {
  return (
    <div className={`grid grid-cols-1  place-items-center  h-full`}>
      <div className="grid rounded bg-white w-[97%] h-[85vh] ">
        <div className={` mt-[1rem]  `}>
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
        LoanProductPage
      </div>
    </div>
  );
}

export default LoanProductPage;
