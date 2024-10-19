import { Link} from "react-router-dom";

function Header(props){

    return (
        <div className="header flex">
            <div className="logo-container">
                <Link to="/">
                    <img src="logo.svg" alt="application logo" className="logo" />
                </Link>
            </div>

            <ol className="navigation center-parent flex">
                {props.isAuthenticated? 
                <>
                    <Link to="/my-listing" className="login link">
                        <li className="center-parent">MY LISTING</li>
                    </Link>
                    <Link to="/profile" className="login link">
                        <li className="center-parent">PROFILE</li>
                    </Link>
                    <Link to="/login" onClick={() => {props.toggleAuth(false)}} className="logout link">
                        <li className="center-parent">Sign Out</li>
                    </Link>
                </>
                :
                <>
                    <Link to="/listing" className="login link">
                        <li className="center-parent">LISTING</li>
                    </Link>
                    <Link to="/login" className="login link">
                        <li className="center-parent">LOGIN</li>
                    </Link>
                    <Link to="/register" className="register link">
                        <li className="center-parent">REGISTER</li>
                    </Link>
                </>
                }
            </ol>
        </div>
    )
}

export default Header;