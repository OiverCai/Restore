import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {Product} from "../../app/models/products";
import  ProductList  from "./ProductList";



export default function Catalog(){
//  export default function Catalog({products, addProduct}: Props){
    const [products, setProducts] = useState<Product[]>([])
    const [loading,setLoading] = useState(true)

  useEffect(() => {
    agent.Catalog.list()
      // .then((response) => response.json())//视频里没有这句话 注意 但我觉得要加上 后来发现自己错了
      .then((data) => setProducts(data))
      .catch(error => console.log(error) )
      .finally(() => setLoading(false))
  }, [])

  if(loading) return <LoadingComponent message="Loading products..."></LoadingComponent>
  
    return (
        <>
            <ProductList products={products} />

        </>
    )
}