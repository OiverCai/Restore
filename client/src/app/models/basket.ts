export interface BasketItem {
    productId: number;
    name: string;
    price: number;
    pictureUrl: string;
    brand: string;
    type: string;
    quantity: number;
}
// 这个是从 basket DTO 转json 再转过来的
export interface Basket {
    id: number;
    buyerId: string;
    items: BasketItem[];
}