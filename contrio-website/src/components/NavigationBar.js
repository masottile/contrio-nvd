import React, {useEffect, useState} from 'react';
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
        // console.log(userData)
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
          >
            <BusinessCenterTwoToneIcon fontSize='large' />
          <Typography style={{textDecoration: 'none', color: 'white', marginLeft: '1rem'}} variant="h6" component={Link} to={'/'} sx={{ flexGrow: 1 }}>
            CONTRIO
          </Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit">
              <Typography style={{textDecoration: 'none', color: 'white'}} component={Link} to={'/contracts'}>Contracts</Typography>
            </Button>
            <Button color="inherit">
              <Typography style={{textDecoration: 'none', color: 'white'}} component={Link} to={'/projects'}>Projects</Typography>
              </Button>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={handleLogout}
            >
              <AccountCircle fontSize='large'/>
              Logout
            </IconButton>
            </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}