import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import { useStoreContext } from "../context/StoreContext";
import { useAppSelector } from "../store/configureStore";

interface Props {
  darkMode: boolean,
  handleDarkMode: () => void,
}

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

export default function Header({darkMode, handleDarkMode}: Props) {//说明传值的时候并不是这个值的拷贝,而是引用 这样使用的就是同一份数据
  // const {basket} = useStoreContext();
  const {basket} = useAppSelector(state => state.basket);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);//reduce 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终为一个值。sum初始为0

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
                <IconButton component={Link} to = '/basket' size='large' sx={{color : 'inherit'}}>
            <Badge badgeContent={itemCount} color='secondary' >
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
