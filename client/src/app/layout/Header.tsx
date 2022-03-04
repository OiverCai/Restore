import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material"
import { NavLink } from "react-router-dom";

interface Props {
  darkMode: boolean,
  handleDarkMode: () => void,
}

export default function Header({darkMode, handleDarkMode}: Props) {//说明传值的时候并不是这个值的拷贝,而是引用 这样使用的就是同一份数据

  const midLinks =[
    {title : "catalog",path: "/catalog"},
    {title : "about",path: "/about"},
    {title : "contact",path: "/contact"},
  ];

  const rightLinks =[
    {title : "login",path: "/login"},
    {title : "register",path: "/register"},
  ];

  const navStyles = {
    textDecoration: 'none',
    color : 'inherit' , 
    typography: "h6" ,
  '&:hover': { color: 'grey.500' },
  '&.active': { color: 'text.secondary' },
  };


  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar sx={{display: 'flex' , justifyContent:'space-between' , alignItems:'center'}}>

          <Box display= 'flex' alignItems='center'>
          <Typography variant="h6" component={NavLink} to='/' sx={navStyles}>Re-Store</Typography>
          <Switch checked={darkMode}  onChange={handleDarkMode} inputProps={{ "aria-label": "controlled" }} />
          </Box>
          
          <Box display= 'flex' alignItems='center'>
          <List sx={{display: 'flex'}}>
            {/* 让下面的item横着拍,因为flex就是这样的 */}
            {midLinks.map(({title,path}) => (
              <ListItem
               key={path} button component={NavLink} to={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
          </Box>
          
              <Box display= 'flex' alignItems='center'>
                <IconButton size='large' sx={{color : 'inherit'}}>
            <Badge badgeContent={4} color='secondary' >
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{display: 'flex'}}>
            {/* 让下面的item横着拍,因为flex就是这样的 */}
            {rightLinks.map(({title,path}) => (
              <ListItem key={path} button component={NavLink} to={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
              </Box>
          

        </Toolbar>
      </AppBar>
    </>
  )
}
