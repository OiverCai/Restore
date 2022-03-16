
import Catalog from "../../features/catalog/Catalog"
import Header from "./Header"
import { Container, createTheme, CssBaseline } from "@mui/material"
import { ThemeProvider } from "@emotion/react"
import { useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/checkout/CheckoutPage";

function App() {
  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId')
    if(buyerId){
      agent.Basket.get()
                  .then((basket)=> setBasket(basket))
                  .catch((error) => console.log(error))
                  .finally(() => setLoading(false))
    }
    else{
      setLoading(false)
    }
  }
  ,[setBasket])
  //如果不写依赖会显示 React Hook useEffect has a missing dependency: 'setBasket'. Either include it or remove the dependency array

  const [darkMode, setDarkMode] = useState(false);//注意这里不能写useState('light')  mode : 不能将类型“string”分配给类型“PaletteMode | undefined”。
  const paletteType = darkMode ? 'dark' :'light' ;
  const theme = createTheme({
    palette: {
      mode : paletteType,
      background:{
       default: paletteType === 'light' ?'#eaeaea' : '#121212',
      } 
    }
  })

  function handleDarkMode() {
    setDarkMode(!darkMode)
  }
  
  if(loading){
    return <LoadingComponent message="Loading app..."></LoadingComponent>
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme='colored' position='bottom-right' hideProgressBar ></ToastContainer>
      <CssBaseline></CssBaseline>
      <Header darkMode={darkMode}  handleDarkMode={handleDarkMode}></Header>
      <Container>
        <Routes>
          <Route  path='/'  element={<HomePage/>}   />
          {/* v6的Route 已经自动化了exact 不用再写了 */}
          <Route path='/catalog'  element={<Catalog />}  />
          <Route path='/catalog/:id'  element={<ProductDetails />}  />
          <Route path='/about'  element={<AboutPage />}  />
          <Route path='/contact'  element={<ContactPage />}  />
          <Route path='/server-error'  element={<ServerError />}  />
          <Route path='/basket'  element={<BasketPage />}  />
          <Route path='/checkout'  element={<CheckoutPage />}  />
          <Route path='*'  element={<NotFound />}  />
          {/* 没有符合的就自动到notfound组件了 */}
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App
