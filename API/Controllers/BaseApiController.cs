

using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    // 使用[controller] 就能复用控制器,比如 catalog ProductDetails
    public class BaseApiController : ControllerBase
    {
        
    }

}