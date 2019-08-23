import { ApiFetch } from "./method";
import { io } from "./io";

interface Config {
  [k: string]: any
}
type ConfigDo<T> = { [k in keyof T]: (obj: object) => Promise<any> };
interface InfIO{
  doProxy: (config: Config) => ConfigDo<Config>;
}


function AjaxMethod(
  target: Object,
  propertyName: string,
  propertyDesciptor: PropertyDescriptor): PropertyDescriptor {
  propertyDesciptor.value = function (...args: any[]) {
    //对config  进行处理
    const config = args[0];
    for (let key in config) {
      let ajaxConfig = config[key];
      config[key] = (data?: any) => {
        return new ApiFetch(ajaxConfig).EXECUTE(data);
      };
    }
    return config;
  };
  return propertyDesciptor;
}

class IOImpl implements InfIO {
  //这里使用注释
  @AjaxMethod
  doProxy(config: Config) {
    return config
  }

}

interface IUserConfig extends Config {
  saveUser: any;
}

const ioApp = new IOImpl().doProxy(io);

export default ioApp;
