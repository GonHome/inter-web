// @ts-ignore
import traverson  from 'traverson';
// @ts-ignore
import JsonHalAdapter  from 'traverson-hal';
import { Toaster, Position, Intent } from '@blueprintjs/core';
traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);
const TOASTER = Toaster.create({ position: Position.TOP });
export const doError = (error: any) => {
  TOASTER.show({
    icon: 'warning-sign',
    intent: Intent.DANGER,
    message: `${error.code} ${error.message}`,
  });
};
export const doErrMessage = (message: string) => {
  TOASTER.show({
    message,
    icon: 'warning-sign',
    intent: Intent.DANGER,
  });
};

export const doSucMessage = (message: string) => {
  TOASTER.show({
    message,
    icon: 'tick',
    intent: Intent.SUCCESS,
  });
};

export const checkError=({error,response}: any)=>{
  //判断是否有异常
  if(error){
    return error;
  }else{
    if(response.error){
      //reponse 错误
      if(response.status>=500){
        return {message:response.text};
      }
      return JSON.parse(response.text);
    }
  }
  return null;
};

// export const api = (() => {
//   const apiHttp = createClient('/api', { withCredentials: true });
//   apiHttp.addHeader('If-Modified-Since', '');
//   apiHttp.interceptors.response.use(
//     response => response,
//     error => {
//       if (error.response) {
//         let message = checkError(error.response);
//         if (!message) {
//           message = error.response.data;
//         }
//         doError(message);
//       }
//     },
//   );
//   return apiHttp;
// })();

export const api = traverson.from('/api/').json().newRequest()
  .withRequestOptions({ headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } }) ;
