
import Catalog from "../../features/catalog/Catalog"
import Header from "./Header"
import { Container, createTheme, CssBaseline } from "@mui/material"
import { ThemeProvider } from "@emotion/react"
import { useState } from "react";

import { Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";

function App() {
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
  

  return (
    <ThemeProvider theme={theme}>
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
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App
