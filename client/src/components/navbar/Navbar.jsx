import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import { useContext } from "react";
import axios from 'axios';
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import Login from "../../pages/login/Login";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser,logout,login  } = useContext(AuthContext);

  const handleLogout = async () => {
   logout();
  };
  console.log(currentUser);
//console.log("Profilepic:",currentUser.profilePic);
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>SnapSync</span>
        </Link>
        {/* <Link to="/"style={{ textDecoration: "none" }}> */}
        <HomeOutlinedIcon />
        {/* </Link> */}
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
            <Link to={`/profile/${currentUser.id}`}>
          <img
            src={"/upload/" + currentUser.profilePic}
            alt=""
           
          />
          </Link>
        {/* <Link to={`/profile/${currentUser.id}`} style={{ textDecoration: "none" }}> */}
          <span>{currentUser.name}</span>
          {/* </Link> */}
          
        </div>
       {currentUser ? (
        <LogoutIcon onClick={logout}>Logout</LogoutIcon>
      ) : (
        <Login/>
      )}
      </div>
    </div>
  );
};

export default Navbar;
