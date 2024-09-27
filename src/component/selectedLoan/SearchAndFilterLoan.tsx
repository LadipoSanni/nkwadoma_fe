import React from 'react';
import {InputAdornment, TextField} from "@mui/material";
import {SearchOutlined} from "@mui/icons-material";
import FilterListIcon from "@mui/icons-material/FilterList";
import styles from "./SelectedLoan.module.css"

const SearchAndFilterLoan = () => {
    return (
        <div id={"searchAndFilterLoanComponent"} className={` flex gap-3 place-content-between md:flex md:gap-3 `}>
            <div className={`flex gap-1 h-[2rem] mt-auto mb-auto md:flex md:place-items-end`}>
                <FilterListIcon id={`filterIcon`} sx={{color: '#979eac', height: 18,marginTop: '5px', width: 20,"&:hover": {borderColor: '#dddddd'},}} ></FilterListIcon>
                <div id={`filterTextOnLoan`} className={`${styles.filter}`}>Filter</div>
            </div>
            <div id={'textInputContainer'} className={``}>
                <TextField
                    id="searchLoan"
                    size='small'
                    placeholder='Search'
                    tabIndex={2}
                    sx={{width: 'inherit'}}
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
        </div>
    );
};

export default SearchAndFilterLoan;