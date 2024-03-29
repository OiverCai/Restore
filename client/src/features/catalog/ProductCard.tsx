import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
// import { useState } from "react";
import { Link } from "react-router-dom"
// import agent from "../../app/api/agent";
// import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/models/product"
import { addBasketItemAsync } from "../basket/basketSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {

  // const [loading,setLoading] = useState(false);
  // const {setBasket} = useStoreContext();

  // function handleAddItem(productId:number){
  //     setLoading(true);

  //     agent.Basket.addItem(productId)
  //                 .then(basket => setBasket(basket))
  //                 .catch(error => console.log(error))
  //                 .finally(() => setLoading(false))
  // }

  const {status} = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

  return (
    <>
      <Card>
        <CardHeader avatar={<Avatar sx={{bgcolor : 'secondary.main'}}>{product.name.charAt(0).toUpperCase()}</Avatar>} title={product.name} titleTypographyProps={{ sx: { fontWeight: "bold", color: "primary.main" } }} />
        <CardMedia component="img" sx={{ height: "140", backgroundSize: "contain", bgcolor: "primary.main" }} image={product.pictureUrl} alt={product.name} title={product.name} />

        <CardContent>
          <Typography gutterBottom color="secondary" variant="h5">
          ¥{(product.price / 100).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton  loading={status.includes('pendingAddItem' + product.id)}
                    onClick={() => dispatch(addBasketItemAsync({productId: product.id}))} size="small">Add to card</LoadingButton>
          <Button component={Link} to ={`/catalog/${product.id}`}  size="small">View</Button>
        </CardActions>
      </Card>
    </>
  )
}
