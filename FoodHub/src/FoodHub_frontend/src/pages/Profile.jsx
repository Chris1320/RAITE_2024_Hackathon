import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import PasswordField from "../components/PasswordField";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClose,
  faPencilAlt,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { isFormValid } from "../utils/Utils";
import { Modal } from "react-bootstrap";
import { FoodHub_backend } from "declarations/FoodHub_backend";

function Profile(props) {
  const [details, setDetails] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    hasOrganization: false,
    organizationName: "",
    organizationAddress: "",
  });

  const [prevDetails, setPrevDetails] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    hasOrganization: false,
    organizationName: "",
    organizationAddress: "",
  });

  const [modal, setModal] = useState({
    show: false,
    message: [],
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    //retrive user data
    FoodHub_backend.retrieve_profile(props.authContext.principal).then((e) => {
      console.log(e);
    });
  }, []);

  const toggleModal = (messages = []) => {
    setModal({
      show: !modal.show,
      message: messages,
    });
  };

  const toggleEdit = () => {
    const newState = !isEdit;
    if (newState) {
      setPrevDetails({ ...details });
    } else {
      setDetails({ ...prevDetails });
      setPrevDetails({});
    }
    setIsEdit(newState);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDetails({
      ...details,
      [id]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setDetails({
      ...details,
      hasOrganization: e.target.checked,
    });
  };

  const handleSubmit = () => {
    const messages = isFormValid(details, false);
    if (messages.length != 0) {
      toggleModal(messages);
      return;
    }

    console.log("no error proceed to data submission");
  };

  return (
    <div className="profile-container center-parent">
      <div className="profile shadow">
        <h3 style={{ textAlign: "center" }} className="mt-3">
          Profile
        </h3>
        <TextField
          slotProps={{
            input: {
              readOnly: !isEdit,
            },
          }}
          className="field"
          id="firstName"
          label="First Name"
          fullWidth
          size="small"
          value={details.firstName}
          onChange={handleInputChange}
        />

        <TextField
          slotProps={{
            input: {
              readOnly: !isEdit,
            },
          }}
          className="field"
          id="lastName"
          label="Last Name"
          fullWidth
          size="small"
          value={details.lastName}
          onChange={handleInputChange}
        />

        <TextField
          slotProps={{
            input: {
              readOnly: !isEdit,
            },
          }}
          className="field"
          id="username"
          value={details.username}
          label="Username"
          fullWidth
          size="small"
          onChange={handleInputChange}
        />

        <PasswordField
          readOnly={!isEdit}
          value={details.password}
          changed={handleInputChange}
        />

        <FormControlLabel
          control={
            <Checkbox
              disabled={!isEdit}
              checked={details.hasOrganization}
              onChange={handleCheckboxChange}
            />
          }
          label="Do you belong to an organization?"
        />
        {details.hasOrganization ? (
          <>
            <TextField
              slotProps={{
                input: {
                  readOnly: !isEdit,
                },
              }}
              className="field"
              id="organizationName"
              label="Organization Name"
              fullWidth
              size="small"
              value={details.organizationName}
              onChange={handleInputChange}
            />

            <TextField
              slotProps={{
                input: {
                  readOnly: !isEdit,
                },
              }}
              className="field"
              id="organizationAddress"
              label="Organization Address"
              fullWidth
              size="small"
              value={details.organizationAddress}
              onChange={handleInputChange}
            />
          </>
        ) : null}

        <div className="controls">
          {isEdit ? (
            <>
              <Button
                onClick={toggleEdit}
                variant="contained"
                color="error"
                className="control-item"
              >
                <FontAwesomeIcon icon={faX} className="me-2" />
                Cancel
              </Button>

              <Button
                onClick={handleSubmit}
                variant="contained"
                color="success"
                className="control-item"
              >
                <FontAwesomeIcon icon={faCheck} className="me-2" />
                Save
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={toggleEdit}
                variant="contained"
                color="primary"
                className="control-item"
              >
                <FontAwesomeIcon icon={faPencilAlt} className="me-2" />
                Edit
              </Button>
            </>
          )}
        </div>
      </div>
      <Modal show={modal.show} onHide={() => toggleModal()}>
        <Modal.Header>
          <Modal.Title>Notice!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Failed to save the profile information due to the following:</p>
          <ul>
            {modal.message.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={() => toggleModal()}
            variant="contained"
            color="secondary"
          >
            <FontAwesomeIcon icon={faClose} className="me-2" /> Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Profile;

