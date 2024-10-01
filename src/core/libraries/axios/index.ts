import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_KEY, API_URL } from '../../constants';

/**
 * Creates an Axios instance with predefined configuration.
 *
 * @type {AxiosInstance}
 */
const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

/**
 * Interceptor to add headers and parameters to each request.
 *
 * @param {InternalAxiosRequestConfig} config - The Axios request configuration.
 * @returns {InternalAxiosRequestConfig} The modified request configuration.
 */
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || {};
    config.headers['Content-Type'] = 'application/json';
    config.params = config.params || {};
    config.params['api_key'] = API_KEY;

    return config;
  },
  /**
   * Handles request errors.
   *
   * @param {AxiosError} error - The Axios error object.
   * @returns {Promise<AxiosError>} A promise that rejects with the error.
   */
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

export default instance;
