import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import PasswordField from "../components/PasswordField";
import { Form, Link } from "react-router-dom";
import { useState } from "react";
import { isEmpty } from "../utils/Utils";
import { ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import { Modal } from "react-bootstrap";

function Register (){

    const [details, setDetails] = useState({
        username: "",
        password: "",
        confirmPassword : "",
        firstName: '',
        lastName: '',
        hasOrganization: false,
        organizationName: '',
        organizationAddress: ''
    })

    const [hasError, setHasError] = useState({
        error: false,
        message: []
    })

    const[showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    const handleInputChange = (e) => {
        const {id, value} = e.target;
        setDetails({
            ...details,
            [id]: value
        })
    }

    const handleCheckboxChange = (e) => {
        setDetails({
            ...details,
            hasOrganization: e.target.checked   
        })
    }

    const isFormValid = () => {
        const message = []
        const hasOrg = details.hasOrganization;
        const exclude = ["organizationName", "organizationAddress"];

        for (const [id, value] of Object.entries(details)) {

            if(hasOrg && exclude.includes(id)){
                if(isEmpty(value)){
                    message.push(`Empty Field on ${id}`);
                }
                continue;
            }

            if(isEmpty(value) && !exclude.includes(id)){
                message.push(`Empty Field on ${id}`);
                continue;
            }
        }

        if(details.password.length < 8){
            message.push("Password must be at least 8 characters")
        }

        if(details.password !== details.confirmPassword){
            message.push("Password did not match");
        }

        return message;

    }

    const handleSubmit = () => {
        
        const checkResult = isFormValid();
        if(checkResult.length != 0){
            setHasError({
                error: true,
                message : checkResult
            });
            toggleModal();
            return;
        }

        // proceed to backend operation beyond this point
        console.log("no error can continue")

    }

    return (
        
        <div className="register-container flex">
            <div className="banner"></div>
            <div className="form center-parent">
                <div>
                    <h3 className="title">Register</h3>
                    
                    <TextField 
                        className="field"
                        id="firstName"
                        label="First Name"
                        fullWidth
                        size="small"
                        value={details.firstName}
                        onChange={handleInputChange}/>

                    <TextField 
                        className="field"
                        id="lastName"
                        label="Last Name"
                        fullWidth
                        size="small"
                        value={details.lastName}
                        onChange={handleInputChange}/>

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

                    <PasswordField
                        value={details.confirmPassword}
                        changed={handleInputChange}
                        confirmPassword/>

                        
                    <FormControlLabel 
                        control={<Checkbox onChange={handleCheckboxChange}/>} 
                        label="Do you belong to an organization?"/>
                    {details.hasOrganization?
                        <>
                            <TextField
                                className="field"
                                id="organizationName"
                                label="Organization Name"
                                fullWidth
                                size="small"
                                value={details.organizationName}
                                onChange={handleInputChange}/>

                            <TextField
                                className="field"
                                id="organizationAddress"
                                label="Organization Address"
                                fullWidth
                                size="small"
                                value={details.organizationAddress}
                                onChange={handleInputChange}/>
                        </>: null }

                    <Button variant="contained" fullWidth onClick={handleSubmit}>Register</Button>
                    <br /><br />
                    <p>Already have an account? <Link to="/login" style={{color: "rgb(152 11 255)"}}><u>Sign In</u></Link></p>
                </div>
            </div>
            <Modal show={showModal} onHide={toggleModal}>
                <ModalHeader>
                    <ModalTitle>
                        Notice!
                    </ModalTitle>
                </ModalHeader>

                <ModalBody>
                    <p>Registration Failed due to the following:</p>
                    <ul>
                        {hasError.message.map((message, index) => (
                            <li key={index}>{message}</li>
                        ))}
                    </ul>
                </ModalBody>

                <ModalFooter>
                    <Button variant="contained" color="secondary" onClick={toggleModal}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );

}

export default Register;