import { Link } from "react-router-dom";
import {Button} from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faList } from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";

function HomePage(){


    return (
        <div className="home">
            <div className="hero-banner">
                <img src="/assets/banner.jpg" alt="hero banner"/>
                <div className="hero-content">
                    <img src="/logo.svg" alt="application logo" />
                    <p className="slogan"><u>FoodHUB</u>, A place where you can share your surplus food supply for those who are in need.</p>
                    <br />
                    <div className="details">
                        <p>Have a surplus of food?<br />Consider signing up and start sharing your food for those who are in need</p>
                        <Link to="/register"><Button variant="contained" fullWidth className="banner-button"><FontAwesomeIcon icon={faClipboard} className="icon"/> Sign Up</Button></Link>
                    </div>
                    <br /><br />
                    <div className="details">
                        <p>To view all the available foods from people, simply follow the link below</p>
                        <Link to="/listing"><Button variant="contained" fullWidth className="banner-button" color="secondary"><FontAwesomeIcon icon={faList} className="icon"/> Food Listing</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;