import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function PasswordField(props){

    const [showPassword, setShowPassword] = useState(false);

    const [isConfirmPassword, setIsConfirmPassword] = useState(false);

    useEffect(() => {

        if (props.confirmPassword){
            setIsConfirmPassword(true);
        }

    }, []);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <FormControl className="field" variant="outlined" size="small" fullWidth>
            {isConfirmPassword?
            <>
                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                <OutlinedInput 
                    id="confirmPassword"
                    onChange={props.changed}
                    value={props.value}
                    type={showPassword? "text" : "password"}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={toggleShowPassword}
                                edge="end">
                                {showPassword? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Confirm Password">
                </OutlinedInput>
            </>
            :
            <>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput 
                    id="password"
                    onChange={props.changed}
                    value={props.value}
                    type={showPassword? "text" : "password"}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={toggleShowPassword}
                                edge="end">
                                {showPassword? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password">
                </OutlinedInput>
            </>
            }
        </FormControl>
    )
}


export default PasswordField;