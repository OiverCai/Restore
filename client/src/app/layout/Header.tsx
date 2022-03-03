import { AppBar, Switch, Toolbar, Typography } from "@mui/material"

interface Props {
  darkMode: boolean,
  handleDarkMode: () => void,
}

export default function Header({darkMode, handleDarkMode}: Props) {//说明传值的时候并不是这个值的拷贝,而是引用 这样使用的就是同一份数据

  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6">Re-Store</Typography>
          <Switch checked={darkMode}  onChange={handleDarkMode} inputProps={{ "aria-label": "controlled" }} />
        </Toolbar>
      </AppBar>
    </>
  )
}
