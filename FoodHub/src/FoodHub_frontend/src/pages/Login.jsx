import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PasswordField from "../components/PasswordField";
import { Link, useNavigate } from "react-router-dom";
import { FoodHub_backend } from "declarations/FoodHub_backend";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function Login(props) {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  const [errorModal, setErrorModal] = useState({
    show: false,
    message: "",
  });

  const toggleErrorModal = (message) => {
    setErrorModal({
      show: !errorModal.show,
      message: message,
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDetails({
      ...details,
      [id]: value,
    });
  };

  const handleSubmit = () => {
    if (details.username.trim().length == 0) {
      toggleErrorModal("Empty Username");
      return;
    }
    if (details.password.trim().length == 0) {
      toggleErrorModal("Empty Password");
      return;
    }
    FoodHub_backend.login_user(JSON.stringify(details))
      .then((response) => {
        const res = JSON.parse(response);
        if (!res.logged) {
          throw new Error(res.message);
        }
        props.setAuthContext(true, res.token);
        navigate("/my-listing");
      })
      .catch((e) => {
        toggleErrorModal(e.message);
      });
  };

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
            onChange={handleInputChange}
          />

          <PasswordField value={details.password} changed={handleInputChange} />

          <Button variant="contained" fullWidth onClick={handleSubmit}>
            Login
          </Button>
          <br />
          <br />
          <p>
            Doesn't have an account yet?{" "}
            <Link to="/register" style={{ color: "rgb(152 11 255)" }}>
              <u>Sign Up</u>
            </Link>
          </p>
        </div>
      </div>
      <Modal show={errorModal.show} onHide={() => toggleErrorModal("")}>
        <Modal.Header>
          <Modal.Title>Login Failed</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Something went wrong while attempting to authenticate</p>
          <p>Message:</p>
          <p>{errorModal.message}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => toggleErrorModal("")}
          >
            <FontAwesomeIcon icon={faClose} className="me2" />
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Login;

