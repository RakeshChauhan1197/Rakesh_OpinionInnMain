import axiosInstance from "app/axiosInstanse";
import { AxiosPromise } from "axios";
import { IKeyValue } from "./Api.type";

const authToken = () => sessionStorage.getItem("token");
const defaultContentType = "application/json";

const makeHeader = (
  header: IKeyValue<string | number | boolean> = {},
  contentType: string | null = defaultContentType,
  response: "blob" | undefined = undefined,
  callbackfunction?: Function
) => {
  const defaultHeader = {
    Authorization: `Bearer ${authToken()}`,
    "Content-Type": contentType ? contentType : defaultContentType,
    ...header,
  };

  const config = {
    headers: defaultHeader,
    responseType: response,
    onUploadProgress: (data: any) => {
      callbackfunction?.(Math.round((100 * data.loaded) / data.total) + 1);
    },
  };

  return config;
};

export const service = {
  getCall: (
    url: string,
    header: IKeyValue<string | number | boolean> = {},
    response: "blob" | undefined = undefined
  ): AxiosPromise => {
    return axiosInstance.get(url, makeHeader(header, defaultContentType, response));
  },

  postCall: (
    url: string,
    body: IKeyValue<any> = {},
    header: IKeyValue<string | number | boolean> = {},
    response: "blob" | undefined = undefined,
    callbackfunction?: Function
  ): AxiosPromise => {
    return axiosInstance.post(
      url,
      body,
      makeHeader(header, defaultContentType, response, callbackfunction)
    );
  },

  postCallBlob: (
    url: string,
    body: IKeyValue<any> = {},
    header: IKeyValue<string | number | boolean> = {},
    response: "blob" | undefined = undefined,
    callbackfunction?: Function
  ): AxiosPromise => {
    return axiosInstance.post(url, body, makeHeader(header, "blob", response, callbackfunction));
  },

  putCall: (
    url: string,
    body: IKeyValue<any> = {},
    header: IKeyValue<string | number | boolean> = {},
    response: "blob" | undefined = undefined
  ): AxiosPromise => {
    console.log("url", body);
    return axiosInstance.put(url, body, makeHeader(header, defaultContentType, response));
  },

  deleteCall: (
    url: string,
    header: IKeyValue<string | number | boolean> = {},
    response: "blob" | undefined = undefined
  ): AxiosPromise => {
    return axiosInstance.delete(url, makeHeader(header, defaultContentType, response));
  },

  putCallBlob: (
    url: string,
    body: IKeyValue<any> = {},
    header: IKeyValue<string | number | boolean> = {},
    response: "blob" | undefined = undefined
  ): AxiosPromise => {
    return axiosInstance.put(url, body, makeHeader(header, "blob", response));
  },
};
