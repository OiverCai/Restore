
import Catalog from "../../features/catalog/Catalog"
import Header from "./Header"
import { Container, createTheme, CssBaseline } from "@mui/material"
import { ThemeProvider } from "@emotion/react"
import { useState } from "react";

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
        <Catalog  />
      </Container>
    </ThemeProvider>
  )
}

export default App
