import { Button, TextField } from "@mui/material";
import { useState } from "react";
import SearchField from "./SearchField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose, faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import shadows from "@mui/material/styles/shadows";
import { Modal } from "react-bootstrap";

function FoodListing(props){

    const [items, setItems] = useState();
    const [display, setDisplay] = useState([]);

    const [isAuthView, setIsAuthView] = useState(false);

    const [selectedItem, setSelectedItem] = useState(null);

    const [formModal, setFormModal] = useState({
        show: false,
        isAdd: true,
        submit: null
    })

    const [modalData, setModalData] = useState({
        image: null,
        name: "",
        address: ""
    })

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useState(() => {
        setItems(props.items);
        setDisplay(props.items);

        if (props.authView) {
            setIsAuthView(true);
        }
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value; 
        const newDisplay = []; 

        for (const item of items) {
            for (const data of Object.values(item)) {
                if(data.includes(value)){
                    newDisplay.push(item);
                    break;
                }
            }
        }
        setDisplay(newDisplay);
    }

    const toggleFormModal = (isAdd, item, submit) => {
        if (!isAdd){
            const itemData = display[item]
            setModalData({
                ...modalData,
                name: itemData.name,
                address: itemData.address
            })
        }else {
            setModalData({
                image: null,
                name: "",
                address: ""
            })
        }
        setFormModal({
            show: !formModal.show,
            isAdd: isAdd,
            submit: submit
        })
        setSelectedItem(item)
    }

    const toggleDeleteModal = (item) => {
        setShowDeleteModal(!showDeleteModal)
        setSelectedItem(item)
    }

    const onImageAdd = (e) => {
        setModalData({
            ...modalData,
            image: e.target.files[0]
        })
    }

    const handleModalDataChange = (e) => {
        const {id, value} = e.target
        setModalData({
            ...modalData,
            [id]: value
        })
    }

    const handleAddSubmit = () => {
        console.log("add")
    }

    const handleEditSubmit = () => {
        console.log("edit")
    }

    const handleDeleteSubmit = () => {
        console.log("delete")
    }


    return (
        <div className="food-listing w-100">
            <div className="search">
                <div className={`search-field ${(isAuthView)? "has-control" : "no-control"}`}>
                    <SearchField changed={handleSearch}/>
                </div>
                {isAuthView?
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => toggleFormModal(true, null, handleAddSubmit)}
                        className="add-item">
                        <FontAwesomeIcon icon={faPlus} className="me-2"/>
                        Add Item
                    </Button> : null
                }
            </div>
            {display.length == 0 ?
                <h3 style={{textAlign: "center"}} className="mt-4">There is no item to display</h3>
            :
                display.map((data, index) => (
                    <div className="food flex shadow">
                        <div key={`${data.item} - ${index}`} className="flex">
                            <div className="img">
                                <img src="/assets/placeholder.jpg" alt="placeholder" />
                            </div>
                            <div className="contents">
                                <h3 className="title mb-0">{data.item}</h3>
                                <p>Listed By: <i>{data.name}</i> | at <i>{data.createdAt}</i></p>
                                <p className="mb-0">Where to find?</p>
                                <p>{data.address}</p>
                            </div>
                        </div>
                        {isAuthView?
                            <div className="controls">
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    color="primary" 
                                    onClick={() => toggleFormModal(false, index, handleEditSubmit)}
                                    className="food-control me-2">
                                        <FontAwesomeIcon icon={faPencilAlt} className="me-2"/>
                                        Edit
                                </Button>
                                
                                <Button 
                                    variant="outlined" 
                                    fullWidth color="error" 
                                    onClick={() => toggleDeleteModal(data.id)}
                                    className="food-control">
                                        <FontAwesomeIcon icon={faTrashAlt} className="me-2"/>
                                        Delete
                                </Button>
                            </div>: null
                        }
                    </div>
                ))
            }

            <Modal show={formModal.show} onHide={() => toggleFormModal(true, null, null)}>
                <Modal.Header>
                    <Modal.Title>{formModal.isAdd? "Create New Listing" : "Edit Listing"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="image" className="me-2"><b>Image:</b></label>
                    <input onChange={onImageAdd} type="file" name="image" accept="image/png, image/jpg, image/jpeg" />
                    <br />
                    <TextField onChange={handleModalDataChange} value={modalData.name} variant="outlined" label="Item Name" size="small" fullWidth className="mt-2 mb-2"/>
                    <TextField onChange={handleModalDataChange} value={modalData.address} variant="outlined" label="Where to Find (Address)" size="small" fullWidth className="mt-2 mb-2"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="me-2" variant="contained" color="secondary" onClick={() => toggleFormModal(true, null, null)}><FontAwesomeIcon icon={faClose} className="me-2"/>Close</Button>
                    <Button variant="contained" color="success" onClick={formModal.submit}><FontAwesomeIcon icon={faCheck} className="me-2"/>Submit</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteModal} onHide={() => toggleDeleteModal(null)}>
                <Modal.Header>
                    <Modal.Title>Notice!</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    Are you sure you want to delete that listing?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="contained" color="secondary" className="me-2" onClick={() => toggleDeleteModal(null)}><FontAwesomeIcon icon={faClose} className="me-2"/>Cancel</Button>
                    <Button variant="outlined" color="error" onClick={handleDeleteSubmit}><FontAwesomeIcon icon={faTrashAlt} className="me-2"/>Delete</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default FoodListing;