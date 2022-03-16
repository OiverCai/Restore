using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        //         Initially,what we're going to be looking
        // at is allowing users to add items to their basket without 登录
        // So we're going to need to give them a randomly
        // generated I.D.so that we can keep track of who's basket
        // belongs to who 

        public List<BasketItem> Items { get; set; } = new();// List<BasketItem>(); 现在能省略了
                                                            //先初始化就能在用的时候直接用
        public void AddItem(Product product, int quantity)
        {
            if(quantity <= 0)
            {
                throw new ArgumentException("数量必须大于0");
            }
            //有东西的就直接添加，没有就新建一个
            if (Items.All(item => item.ProductId != product.Id))
            {
                //如果没有就新建一个
                Items.Add(new BasketItem
                {
                    Product = product,
                    Quantity = quantity
                });
            }
                var item = Items.FirstOrDefault(i => i.ProductId == product.Id);
                if (item != null)
                {
                    item.Quantity += quantity;
                }
            
        }

        public void RemoveItem(int ProductId,int quantity){ 
            var item = Items.FirstOrDefault(i => i.ProductId == ProductId);
            if (item != null)
            {
                item.Quantity -= quantity;
                if (item.Quantity <= 0)
                {
                    Items.Remove(item);
                }
            }
        }
    }
}