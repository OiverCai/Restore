import axios, { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify"
import {myHistory} from "../customRouter/history"

axios.defaults.baseURL = "http://localhost:5213/api/"

const responseBody = (Response: AxiosResponse) => Response.data

const sleep = new Promise(resolve => {setTimeout(resolve, 500)});

axios.interceptors.response.use(
 async (response) => {
  await sleep;
  return response;
 } ,
  (error: AxiosError) => {
    console.log(error) 
    const { data, status } = error.response! //后面加!可以确保error.response有值 ts有时候太严格了 但是情况很复杂 而且此时我们可以肯定的是error.response有值
    switch (status) {
      case 400:
          if(data.errors){
            const moduleStateErrors : String[] = [];
            for(let key in data.errors){
                if(data.errors[key])
                    moduleStateErrors.push(data.errors[key]);
                }
                throw moduleStateErrors.flat();
          }
        toast.error(data.title)
        break;
      case 401:
        toast.error(data.title)
        break
      case 500:
        // console.log(data)
        myHistory.replace(
           '/server-error',
           data//似乎这个data是没有用的.传不过去
        ); // 
        // window.location.href = "/server-error" //无奈之举,v6我还暂时不知道怎么改 除非自己写customRouter
        //  toast.error(data.title) //////
        break
      default:
        break
    }
    return Promise.reject(error.response)
  }
)

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody), //新建 如果需要服务端生成ID，就用 POST，否则（也就ID已知），用PUT。
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody), //更新
  del: (url: string) => axios.delete(url).then(responseBody),
} //包装http 请求

const Catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
}

const TestErrors = {
  get400Error: () => requests.get("Buggy/bad-request"),
  get401Error: () => requests.get("Buggy/unauthorized"),
  get404Error: () => requests.get("Buggy/not-found"),
  get500Error: () => requests.get("Buggy/server-error"),
  getValidationError: () => requests.get("Buggy/validation-error"),
}

const agent = {
  Catalog,
  TestErrors,
}
// ES6中，当对象中的key：value键值对，如果value是个变量/函数，此时省略key，key的值就是变量名/函数名。

export default agent
