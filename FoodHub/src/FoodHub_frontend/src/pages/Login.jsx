import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PasswordField from "../components/PasswordField";
import { Link } from "react-router-dom";

function Login(){

    const [details, setDetails] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const {id, value} = e.target
        setDetails({
            ...details,
            [id]: value
        })
    }

    useEffect(() => {
        document.body.style.setProperty("overflow", "hidden")
    }, [])

    return (
        <div className="login-container flex">
            <div className="banner"></div>
            <div className="form center-parent">
                <div>
                    <h3 className="title">Login</h3>
                    <TextField 
                        className="field"
                        id="username" 
                        value={details.username} 
                        label="Username" 
                        fullWidth 
                        size="small" 
                        onChange={handleInputChange}/>

                    <PasswordField 
                        value={details.password} 
                        changed={handleInputChange}/>
                        
                    <Button variant="contained" fullWidth>Login</Button>
                    <br /><br />
                    <p>Doesn't have an account yet? <Link to="/register" style={{color: "rgb(152 11 255)"}}><u>Sign Up</u></Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login;