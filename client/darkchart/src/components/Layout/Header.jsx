
import React from 'react';
import { AppBar, IconButton, Toolbar, Tooltip, Typography, Box } from '@mui/material';
import { Add as AddIcon, Group as GroupIcon, Menu as MenuIcon, Search as SearchIcon, Logout as LogoutIcon, Notifications as NotificationIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
//import logo from '../../../jpgfiles/darkchat2.jpg';
import { logout } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { setIsMobile } from '../../redux/missSclice';


function Header({ onSearchClick, onNotificationClick, onNewGroupClick }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMobile = () => {
        dispatch(setIsMobile(true));
    }

    const navigateToGroup = () => {
        navigate("/groups");
    }

    async function logoutHandler (e) {
        e.preventDefault();

        const response = await dispatch(logout());
        if(response?.payload?.data)
            navigate("/login");
    };

    const IconBtn = ({ title, icon, onClick }) => {
        return (
            <Tooltip title={title}>
                <IconButton color="inherit" size="large" onClick={onClick}>
                    {icon}
                </IconButton>
            </Tooltip>
        );
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, height: "4rem" }}>
                <AppBar position="static" sx={{ bgcolor: "#2a9cc9" }}>
                    <Toolbar>
                    {/* <img src={logo} alt="Darkchat Logo" style={{ height: '2rem', marginRight: '0.5rem' }} /> */}
                        <Typography
                            variant="h6"
                            sx={{
                                display: { xs: "none", sm: "block" },
                                // color:"black",
                                fontWeight: 'bold',
                                letterSpacing: 1.5
                            }}>
                            DarkChat
                        </Typography>
                        <Box sx={{ display: { xs: "block", sm: "none" } }}>
                            <IconButton color="black" onClick={handleMobile}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconBtn
                               
                                title={"Search"}
                                icon={<SearchIcon />}
                                onClick={onSearchClick}
                            />
                            <IconBtn
                              
                                title={"New Group"}
                                icon={<AddIcon />}
                                onClick={onNewGroupClick} // Updated to handle New Group click
                            />
                            <IconBtn
                               
                                title={"Manage Groups"}
                                icon={<GroupIcon />}
                                onClick={navigateToGroup}
                            />
                            <IconBtn
                             
                                title={"Notifications"}
                                icon={<NotificationIcon />}
                                onClick={onNotificationClick}
                            />
                            <IconBtn
                                
                                title={"Logout"}
                                icon={<LogoutIcon />}
                                onClick={logoutHandler}
                            />
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}

export default Header;
