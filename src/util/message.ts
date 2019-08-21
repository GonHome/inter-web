import { Toaster, Position, Intent } from '@blueprintjs/core';

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

