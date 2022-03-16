import { Add, Delete, Remove } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"
import agent from "../../app/api/agent"
import { useStoreContext } from "../../app/context/StoreContext"
import LoadingComponent from "../../app/layout/LoadingComponent"
import { currencyFormat } from "../../app/util/util"
import BasketSummary from "./BasketSummary"

export default function BasketPage() {
  const [status, setStatus] = useState({ loading: false, name: "" })
  const { setBasket, removeItem, basket } = useStoreContext()

  function handleAddItem(ProductId: number, name: string) {
    setStatus({ loading: true, name })
    agent.Basket.addItem(ProductId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }))
  }

  function handleRemoveItem(productId: number, quantity = 1, name: string) {
    setStatus({ loading: true, name })
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity)) //这里使用的是react前端的 remove
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }))
  }

  if (status.loading) {
    return <LoadingComponent message="Loading basket"></LoadingComponent>
  }

  if (!basket) return <Typography variant="h3">Your basket is empty, please add some products</Typography>

  return (

    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map((item) => (
            <TableRow key={item.productId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center">
                  <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }}></img>
                  {item.name}
                </Box>
              </TableCell>
              <TableCell align="right">{currencyFormat(item.price)} </TableCell>
              <TableCell align="right">
                <LoadingButton loading={status.loading && status.name === "rem" + item.productId} onClick={() => handleRemoveItem(item.productId, 1, "rem" + item.productId)} color="error">
                  <Remove />
                </LoadingButton>
                {item.quantity}
                <LoadingButton loading={status.loading && status.name === "rem" + item.productId} onClick={() => handleAddItem(item.productId, "add" + item.productId)} color="secondary">
                  <Add />
                </LoadingButton>
              </TableCell>
              <TableCell align="right">{currencyFormat(item.price)}   </TableCell>
              <TableCell align="right">
                <LoadingButton loading={status.loading && status.name === "rem" + item.productId} onClick={() => handleRemoveItem(item.productId, item.quantity, "rem" + item.productId)} color="error">
                  <Delete></Delete>
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button   component={Link}   to='/checkout'   variant='contained'   size='large'  fullWidth >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
    </>
  )
}
