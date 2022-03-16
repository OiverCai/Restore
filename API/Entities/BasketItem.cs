using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("BasketItems")]//ef创建表的时候就会生成名字BasketItems而不是BasketItem
    public class BasketItem
    {
        public int Id { get; set; }
//         to be automatically generated when we add
// a new item into our database,and in this case,we've got
        public int Quantity { get; set; }

        // navigation properties How does it get from the basket item to
// the product,in other words?

        public int ProductId { get; set; }
        public Product Product { get; set; }
        //so we're not going to have a full product inside our Baskets item table.

        public Basket Busket { get; set; }
        public int BusketId { get; set; }
    }
}