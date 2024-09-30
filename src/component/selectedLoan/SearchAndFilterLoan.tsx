import React from 'react';
import {InputAdornment, TextField} from "@mui/material";
import {SearchOutlined} from "@mui/icons-material";
import FilterListIcon from "@mui/icons-material/FilterList";
import styles from "./SelectedLoan.module.css"

const SearchAndFilterLoan = () => {
    return (
        <div id={"searchAndFilterLoanComponent"} className={` grid md:flex md:gap-3 mt-auto ml-auto`}>
            <div className={`flex gap-1  mt-auto mb-auto`}>
                <FilterListIcon id={`filterIcon`} sx={{color: '#979eac', height: 20, width: 20}}
                                ></FilterListIcon>
                <div id={`filterTextOnLoan`} className={`${styles.filter}`}>Filter</div>
            </div>
            <TextField
                id="searchLoan"
                size='small'
                placeholder='Search'
                tabIndex={2}
                sx={{width: '20rem'}}
                // onChange={(e) => handleSearch(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchOutlined fontSize='small'/>
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
            />
        </div>
    );
};

export default SearchAndFilterLoan;