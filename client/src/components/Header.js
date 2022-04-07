import * as React from "react";
import {
  Toolbar,
  Button,
  IconButton,
  MenuItem,
  Tooltip,
  ListItemIcon,
  Menu,
  Avatar,
  Divider,
  AppBar,
  Typography,
  Box,
} from "@mui/material";
import {
  Logout,
  AddCircle,
} from "@mui/icons-material";
import auth from "./auth/auth-helper";
import { Link } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
// import Home from "../pages/Home/Home";
// import Profile from "../pages/Home/Profile";
// import About from '../pages/Home/About';

const Header = () => {
  const history = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [signIn, setSignIn] = React.useState(true);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignInDisplay = () => {
    setSignIn(!signIn);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        {/* fixed */}
        <Toolbar>
          <Typography component={Link} variant="h6" sx={{ flexGrow: 1 }} to="/" style={{textDecoration: 'inherit', color: 'inherit'}}>
            WeReview Residences
          </Typography>          
          <Link to="/about" style={{textDecoration: 'inherit', color: 'inherit'}} sx={{ flexGrow: 1, textDecoration: 'none', style: 'none' }}>ABOUT</Link>
          {auth.isAuthenticated() && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {/* <Link to='/profile' style={{ textDecoration: 'none' }}>
                  <MenuItem>
                    <Avatar /> Profile
                  </MenuItem>
                </Link>
                <Link to='/myreviews' style={{ textDecoration: 'none' }}>
                <MenuItem>
                  <ListItemIcon>
                    <Reviews fontSize="small" />
                  </ListItemIcon>
                  My reviews
                </MenuItem>
                </Link> */}
                <Link to='/createReview' style={{ textDecoration: 'none' }}>
                  <MenuItem>
                    <ListItemIcon>
                      <AddCircle fontSize="small" />
                    </ListItemIcon>
                    Add a review
                  </MenuItem>
                </Link>
                <Divider />
                {/* <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem> */}
                <MenuItem onClick={() => {
                  auth.signout(() => history('/'));
                }}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
          {!auth.isAuthenticated() ? signIn ?
            (<span>
              <Link to="/signin" style={{textDecoration: 'inherit', color: 'inherit'}}>
                <Button color="inherit" onClick={handleSignInDisplay} >SIGN IN</Button>
              </Link>
            </span>): 
            (<span>
            <Link to="/signup" style={{textDecoration: 'inherit', color: 'inherit'}}>
                <Button color="inherit" onClick={handleSignInDisplay} >SIGN UP</Button>
              </Link>
            </span>)   : <></>        }
        </Toolbar>
      </AppBar>
    </Box>
  );
  // });
};

export default Header;
