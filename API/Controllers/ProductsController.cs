
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    // [ApiController]
    // [Route("api/[controller]")] 因为引入了 BaseApiController 自带了属性,所以继承的时候不用再写了
    public class ProductsController : BaseApiController //依赖注入 get our store context inside here so that
// we've got access to the products table in our database.
    {
//         Now what we want to do in order to use
// dependency injection,we create a private field inside our class and assign that private fields to the context that we're adding in our constructor here.
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProductsAsync()
        {
            var products = await _context.Products.ToListAsync();
            if (products == null)
            {
                return NotFound();
            }
            return Ok(products);
        }

        [HttpGet("{id}")]
        // id就是parameter name   api/produts/{id}
        public async Task<ActionResult<Product>> GetProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

    }
}