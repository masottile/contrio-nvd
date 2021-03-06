import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import { Button } from '@mui/material';
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessTwoTone'
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import contrioLogo from '../images/contrio_logo.png'
export default function NavigationBar() {
  const menuId = 'primary-search-account-menu';
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    const cognitoData = Object.keys(localStorage).filter((key) => key.includes('CognitoIdentityServiceProvider'));

    cognitoData.forEach((key) => {
      localStorage.removeItem(key);
    })
    window.location.reload(false);
  }

  useEffect(() => {
    Object.keys(localStorage).forEach((key) => {
      const keySplit = key.split('.');

      if (keySplit[0] === 'CognitoIdentityServiceProvider' && keySplit[keySplit.length - 1] === 'userData') {
        const userData = JSON.parse(localStorage.getItem(key))
        setUser(userData)
      }
    })
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            component={Link}
            to={'/'}
          >
            <img src={contrioLogo} style={{ height: 50 }} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" component={Link} to={'/contracts'}>
              <Typography style={{ textDecoration: 'none', color: 'white' }}>Contracts</Typography>
            </Button>
            <Button color="inherit" component={Link} to={'/projects'}>
              <Typography style={{ textDecoration: 'none', color: 'white' }}>Projects</Typography>
            </Button>
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={handleLogout}
            >
              <AccountCircle fontSize='large' />
              Logout
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}