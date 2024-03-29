import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
// import { useStoreContext } from "../../app/context/StoreContext";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync  } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
    // const {basket,setBasket,removeItem} = useStoreContext();
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const {id} = useParams<{id: string}>();
    // const [product,setProduct] = useState<Product | null>(null);
    // const [loading, setLoading] = useState(true);
    const product = useAppSelector(state => productSelectors.selectById(state, id!));//暂时先用!顶上
    const {status: productStatus} = useAppSelector(state => state.catalog);
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(i => i.productId === product?.id)

    useEffect( () => {
        if(item) setQuantity(item.quantity);
    //      agent.Catalog.details(parseInt(id || "1"))
    //                        .then(response => {setProduct(response);})//response.data 要改成response 因为axios包装过了
    //                        .catch(error=> {console.log(error);})
    //                        .finally(() => {setLoading(false) });//最后要记得让loading结束
    // }, [id,item])//只有id变化时才会执行,但其实这个页面内不会变id
    if (!product) dispatch(fetchProductAsync(parseInt(id!)))
}, [id, item, dispatch, product]);

    function handleUpdateCart() {
        // setSubmitting(true);
        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            // agent.Basket.addItem(product?.id!, updatedQuantity)
            //     .then(basket => setBasket(basket))
            //     .catch(error => console.log(error))
            //     .finally(() => setSubmitting(false));
            dispatch(addBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
        } else {
            const updatedQuantity = item.quantity - quantity;
            // agent.Basket.removeItem(product?.id!, updatedQuantity)
            //     .then(() => removeItem(product?.id!, updatedQuantity))
            //     .catch(error => console.log(error))
            //     .finally(() => setSubmitting(false));
            dispatch(removeBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
        }
    }

    function handleInputChange(event: any) {
        event.preventDefault();
        if (event.target.value >= 0) {
            setQuantity(parseInt(event.target.value));//string 转过来的number
        }
    }

    // if(loading) return <LoadingComponent message="Loading product..."></LoadingComponent>
    if (productStatus.includes('pending')) return <LoadingComponent message='Loading product...' />

    if(!product) {
        return <NotFound />;
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}}/>
            </Grid>
            <Grid item xs={6}>
               <Typography variant="h3">{product.name}</Typography>
               <Divider/>
               <Typography variant="h4" color="secondary">¥{(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField 
                            variant='outlined'
                            type='number'
                            label='Quantity in Cart'
                            fullWidth
                            value={quantity}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.quantity === quantity || !item && quantity === 0}
                            // loading={submitting}
                            loading={status.includes('pending')}
                            onClick={handleUpdateCart}
                            sx={{height: '55px'}}
                            color='primary'
                            size='large'
                            variant='contained'
                            fullWidth
                        >
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        
    )
};
