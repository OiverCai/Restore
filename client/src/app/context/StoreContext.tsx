import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
    basket : Basket | null;
    setBasket : (basket : Basket | null) => void;
    removeItem : (productId : number ,  quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext (){
    const context = useContext(StoreContext);
    if(context === undefined){ //注意这个undefined
        throw new Error("StoreContext does not exits");
    }
    return context;
}

export function StoreProvider({children} : PropsWithChildren<any>){
        const [basket,setBasket] = useState<Basket | null>(null);

        function removeItem(productId : number , quantity : number){
            if(!basket) return;
            const items = [...basket.items];
            const index = items.findIndex(i => i.productId === productId);
            if(index >= 0){
                items[index].quantity -= quantity;
                if(items[index].quantity <= 0){
                    items.splice(index,1);
                }
                setBasket((prevBasket) => ({...prevBasket!,items}));//这里我们确定prevBasket存在
            }
        }

        return (
            // 返回的是一个StoreContext.Provider 给其他组件消费使用
                <StoreContext.Provider value={{basket,setBasket,removeItem}}>
                    {children}
                </StoreContext.Provider>
        )

}

