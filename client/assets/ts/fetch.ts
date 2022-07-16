import { useStore } from "@Assets/ts/store";

export enum FETCH_MODE {
  DATA_JSON,
  MULTIPART,
}

export enum FETCH_METHODS {
  GET,
  POST,
  PUT,
  DELETE,
}

interface Request_Options {
  method: string;
  headers: Headers;
  cache: RequestCache;
  body?: string | FormData;
}

class Fetch_Class {
  private static headers(type: FETCH_MODE): Headers {
    const headers: Headers = new Headers();

    const pinia = useStore();

    switch (type) {
      case FETCH_MODE.DATA_JSON:
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");

        if (pinia.token !== null)
          headers.append("Authorization", `Token ${pinia.token}`);
        break;
      case FETCH_MODE.MULTIPART:
        headers.append("Accept", "multipart/form-data");
        if (pinia.token !== null)
          headers.append("Authorization", `Token ${pinia.token}`);
        break;
      default:
        throw new Error("No se pudo crear los headers para la peteción");
    }

    return headers;
  }

  static request<T>(
    url: string,
    method: FETCH_METHODS,
    data: T = null,
    headers: FETCH_MODE = FETCH_MODE.DATA_JSON
  ): Request {
    const options: Request_Options = {
      method: FETCH_METHODS[method],
      cache: "no-store",
      headers: Fetch_Class.headers(headers),
    };

    if (method !== FETCH_METHODS.GET) {
      if (data !== null) {
        if (headers === FETCH_MODE.DATA_JSON)
          options["body"] = JSON.stringify(data);
        else if (headers === FETCH_MODE.MULTIPART) {
          const formData: FormData = new FormData();

          Object.keys(data).forEach((key) => formData.append(key, data[key]));

          options["body"] = formData;
        }
      }
    }

    return new Request(url, options);
  }
}

export { Fetch_Class as Fetch };
