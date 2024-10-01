import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import { API_KEY } from "../../constants";

const instance: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 5000,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || {};
    config.headers['Content-Type'] = 'application/json';
    config.params = config.params || {};
    config.params['api_key'] = API_KEY;

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default instance;