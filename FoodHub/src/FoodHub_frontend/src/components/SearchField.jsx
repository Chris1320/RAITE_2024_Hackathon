import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchField(props){

    return (
        <FormControl className="field" variant="outlined" size="small" fullWidth>
            <InputLabel htmlFor="search">Search</InputLabel>
            <OutlinedInput 
                id="search"
                onChange={props.changed}
                endAdornment={
                    <InputAdornment position="start">
                        <IconButton
                            edge="end">
                                <FontAwesomeIcon icon={faSearch}/>
                        </IconButton>
                    </InputAdornment>
                }
                label="Search">
            </OutlinedInput>
        </FormControl>
    )
}


export default SearchField;