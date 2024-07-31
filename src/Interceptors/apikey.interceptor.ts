import { HttpInterceptorFn} from '@angular/common/http';


export const apikeyInterceptor: HttpInterceptorFn = (req, next) => {

 const isApiReequest = req.url.startsWith('http://3.110.27.195:5024/api')

 //const isApiReequest = req.url.startsWith('https://localhost:7101/api')


  const ApiKey ='abc'
  if(isApiReequest){
    req = req.clone({
      setHeaders:{
        'ApiKey': ApiKey,
      }
    });
  }
  return next(req);
};
