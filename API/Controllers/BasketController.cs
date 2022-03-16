using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        //We're going to need an endpoint to fetch an individual basket.
        //We'll need an endpoint to add an item to
        // the basket and of course,an endpoint to remove an item.

        //how do we identify the basket that we're going to look for here?
        //cookie!
        //When a user creates a baskets on our server,
        // we're going to return them a buyerId.
        // Which is going to be sent back to him as
        // a cookie and cookies are stored in a user's browser in storage,
        //And for every response,we used a cookie and it goes
        // backwards and forwards between the client and the server,
        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket? basket = await RetrieveBasket();
            if (basket != null)
            {
                return MapBasketToDto(basket);
            }
            return NotFound();

        }

        [HttpPost] ///api/basket?productId=3&quantity=2 访问的格式
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            //用户没有basket就新建一个 然后把basket添加到数据库
            var basket = await RetrieveBasket();
            if (basket == null)
            {
                basket = CreateBasket();
            }
            // /get product
            var product = await _context.Products.FindAsync(productId);
            if (product == null)//找到这个ID的商品,没有就返回
            {
                return BadRequest(new ProblemDetails { Title = "Product Not Found" });
            }
            // /add item
            basket.AddItem(product, quantity);
            // /save changes
            var result = await _context.SaveChangesAsync() > 0;//可能没有存进去

            if (result) return CreatedAtRoute("GetBasket",MapBasketToDto(basket));
            //把201 替换成CreatedAtRoute(string routename , object valuesendingback)  routename要先在get 方法的 http属性增加名字(见上)作为路由 , 
            //返回头会带上一句 location: http://localhost:5213/api/Basket 
//             And the get baskets it's going to add a location header  to our response. 
            return BadRequest(new ProblemDetails { Title = "Problem saving to the basket" });
        }





        [HttpDelete]
        public async Task<ActionResult<Basket>> RemoveItemFromBasket(int productId, int quantity)
        {
            if (quantity <= 0)
                return BadRequest(new ProblemDetails { Title = "Quantity must be greater than zero" });

            //  get basket
            var basket = await RetrieveBasket();
            if (basket == null) return BadRequest(new ProblemDetails { Title = "Basket not found" });

            // var product = await _context.Products.FindAsync(productId);  不用写 因为RemoveItem里会自动判断的
            // if(product == null)
            // {
            //     return BadRequest(new ProblemDetails { Title = "Product Not Found" });
            // }
            // /remove item or reduce quantity
            basket.RemoveItem(productId, quantity);
            // save changes
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem Saving the result of deleting product from   the basket" });
        }



        private async Task<Basket> RetrieveBasket()//选中下面这行代码之后再左边的灯泡这里可以选中 提取方法 
        {
            return await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(b => b.BuyerId == Request.Cookies["buyerId"]);
            //include : A new query with the related data included. 
            //ThenInclude : Specifies additional related data to be further included based on a related type that was just included.
        }

        private Basket? CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();//创建全局唯一标识符

            //别加httponly标识符 The HTP only means it's only going to be
            // sent and received over network requests over HTP requests. And that makes it impossible for us to retrieve
            // it from JavaScript or TypeScript.  And there will be an occasion where we do
            // need to retrieve the baskets it or to buy it inside our client  So this is the only properties we're going to set for our cookie.
            Response.Cookies.Append("buyerId", buyerId, new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30)
            });
            var basket = new Basket()
            {
                BuyerId = buyerId
                //只有这个是要生成的,因为ID ef自己生成的 , 另外一个已经初始化了
            };
            _context.Baskets.Add(basket);
            return basket;
        }

        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto()
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(i => new BasketItemDto
                {
                    ProductId = i.ProductId,
                    Name = i.Product.Name,
                    Quantity = i.Quantity,
                    Price = i.Product.Price,
                    PictureUrl = i.Product.PictureUrl,
                    Brand = i.Product.Brand,
                    Type = i.Product.Type
                }).ToList()
            };
        }
    }
}