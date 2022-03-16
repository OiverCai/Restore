// import { useState, useEffect } from "react";
// import agent from "../../app/api/agent";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
// import {Product} from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import  ProductList  from "./ProductList";



export default function Catalog(){
//  export default function Catalog({products, addProduct}: Props){
    // const [products, setProducts] = useState<Product[]>([])
    // const [loading,setLoading] = useState(true)
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

  useEffect(() => {
  //   agent.Catalog.list()
  //     // .then((response) => response.json())//视频里没有这句话 注意 但我觉得要加上 后来发现自己错了
  //     .then((data) => setProducts(data))
  //     .catch(error => console.log(error) )
  //     .finally(() => setLoading(false))
  // }, [])
  if (!productsLoaded) dispatch(fetchProductsAsync());
}, [productsLoaded, dispatch])

  // if(loading) return <LoadingComponent message="Loading products..."></LoadingComponent>
  if (status.includes('pending')) return <LoadingComponent message='Loading products...' />
  
    return (
        <>
            <ProductList products={products} />

        </>
    )
}