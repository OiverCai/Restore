import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/products";

export default function ProductDetails() {
    const {id} = useParams<{id: string}>();
    const [prodcut,setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
         axios.get(`http://localhost:5213/api/Products/${id}`)
                           .then(response => {setProduct(response.data);})
                           .catch(error=> {console.log(error);})
                           .finally(() => {setLoading(false);});//最后要记得让loading结束
    }, [id])//只有id变化时才会执行,但其实这个页面内不会变id

    if(loading) {
        return <Typography>Loading...</Typography>
    }

    if(!prodcut) {
        return <Typography>Product not found</Typography>
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={prodcut.pictureUrl} alt={prodcut.name} style={{width: '100%'}}/>
            </Grid>
            <Grid item xs={6}>
               <Typography variant="h3">{prodcut.name}</Typography>
               <Divider/>
               <Typography variant="h4" color="secondary">¥{(prodcut.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{prodcut.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{prodcut.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{prodcut.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{prodcut.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{prodcut.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>

        
    )
};
