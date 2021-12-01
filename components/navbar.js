import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from '@mui/material/Drawer';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function BasicAppBar({ children }) {

    const [state, setState] = React.useState({
        left: false,
      });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = () => (
    <Box
    //   sx={250}
      role="presentation"
      onClick={toggleDrawer('left', false)}
      onKeyDown={toggleDrawer('left', false)}
    >
      <List>
        <ListItem button key='item-base64' component={Link} href="/base64">
            <ListItemIcon>
                <MailIcon />
            </ListItemIcon>
            <ListItemText primary={'Base64 Converter'} />
        </ListItem>
        <ListItem button key='item-jsonformatter' component={Link} href="/jsonformatter">
            <ListItemIcon>
                <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={'JSON Formatter'} />
        </ListItem>
        <ListItem button key='item-xmlformatter' component={Link} href="/xmlformatter">
            <ListItemIcon>
                <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={'XML Formatter'} />
        </ListItem>
        <ListItem button key='item-xmljson' component={Link} href="/jsonxml">
            <ListItemIcon>
                <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={'JSON XML Converter'} />
        </ListItem>
          
      </List>
      
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <React.Fragment key={'left'}>
                <IconButton
                    onClick={toggleDrawer('left', true)}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                
                <Drawer
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                >
                    {list()}
                </Drawer>
            </React.Fragment>
            
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sing Tools
          </Typography>
        </Toolbar>
      </AppBar>
      
      <main>{children}</main>
    </Box>
  );
}
