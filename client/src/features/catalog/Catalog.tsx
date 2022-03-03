import { useState, useEffect } from "react";
import {Product} from "../../app/models/products";
import  ProductList  from "./ProductList";



export default function Catalog(){
//  export default function Catalog({products, addProduct}: Props){
    const [products, setProducts] = useState<Product[]>([])


  useEffect(() => {
    fetch("http://localhost:5213/api/Products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
  }, [])
    return (
        <>
            <ProductList products={products} />

        </>
    )
}