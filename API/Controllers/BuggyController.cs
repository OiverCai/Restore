

using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
//         Our APl controller doesn't actually or is not
// able to tell the difference between what we call these What we need is a unique route for each of these.
        [HttpGet("not-found")]
        public ActionResult GetNotFound(){
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest(){
            //这是当某种行为可能会出错的时候  比如 这时候要保存到数据库中 但是发现没什么要更新保存的
            //直接写  return BadRequest( "this is a bad request") 就没有返回的body 只有string 了
            return BadRequest(new ProblemDetails{Title = "this is a bad request"} );
        }

        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorized(){
            //  Console.WriteLine("Unauthorized");

            return Unauthorized() ;
        }        

        [HttpGet("validation-error")]
        public ActionResult GetValidationError(){

            //比如表格那个空没有填
            //下面是apicontroller 的控制功能
            //ModelState是一个字典类型，这句话的作用是向ModelState中添加一条错误信息，第一个参数是Key,第二个参数是Value。 如果ModelState有问题就会返回400
            ModelState.AddModelError("problem1", "this is the first problem");
            ModelState.AddModelError("problem2", "this is the second problem");
            return ValidationProblem();
        }

        [HttpGet("server-error")]
         public ActionResult GetServerError(){
            throw new Exception("this is a server error");
        }


    }
}