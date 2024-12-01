import { Modal, notification, Spin } from 'antd';
import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import ErrorScreen from '../pages/Error/ErrorScreen';
import { routes } from '../utils/routes/definedRoutes';
import { useAuthContext } from './AuthContext';

interface Props {
  children: ReactNode;
}

enum RequestType {
  get,
  post,
  put,
  deleteEntity,
}

const API_PATH = 'http://localhost:6969';

export interface IUseHttpValues {
  get: <T>(url: string, showLoader?: boolean) => Promise<T | undefined>;
  post: <T>(
    url: string,
    body: any,
    showLoader?: boolean,
    showNotification?: boolean
  ) => Promise<T | undefined>;
  put: <T>(
    url: string,
    body?: any,
    showLoader?: boolean,
    showNotification?: boolean
  ) => Promise<T | undefined>;
  deleteEntity: <T>(
    url: string,
    showLoader?: boolean
  ) => Promise<T | undefined>;
  setLoading: (newState: boolean) => void;
}

const defaultState: IUseHttpValues = {
  get: () => {
    throw new Error('Function not implemented!');
  },
  post: () => {
    throw new Error('Function not implemented!');
  },
  put: () => {
    throw new Error('Function not implemented!');
  },
  deleteEntity: () => {
    throw new Error('Function not implemented!');
  },
  setLoading: () => {
    throw new Error('Function not implemented!');
  },
};

const HttpContext = createContext<IUseHttpValues>(defaultState);
export const useHttpContext = () => useContext(HttpContext);

export const HttpContextProvider: FC<Props> = (props: Props) => {
  const { jwt } = useAuthContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function get<T>(
    url: string,
    showLoader?: boolean
  ): Promise<T | undefined> {
    return await handleRequest<T>(RequestType.get, url, showLoader);
  }

  async function post<T>(
    url: string,
    body: any,
    showLoader?: boolean,
    showNotification?: boolean
  ): Promise<T | undefined> {
    return await handleRequest<T>(
      RequestType.post,
      url,
      showLoader,
      body,
      showNotification
    );
  }

  async function put<T>(
    url: string,
    body?: any,
    showLoader?: boolean,
    showNotification?: boolean
  ): Promise<T | undefined> {
    return await handleRequest<T>(
      RequestType.put,
      url,
      showLoader,
      body,
      showNotification
    );
  }

  async function deleteEntity<T>(
    url: string,
    showLoader?: boolean
  ): Promise<T | undefined> {
    return await handleRequest<T>(RequestType.deleteEntity, url, showLoader);
  }

  const handleRequest = async <T,>(
    requestType: RequestType,
    url: string,
    showLoader?: boolean,
    body?: any,
    showNotification?: boolean
  ): Promise<T | undefined> => {
    let resp: T | undefined = undefined;

    if (showLoader !== false) {
      setLoading(true);
    }

    if (body?._intermediateData) {
      delete body._intermediateData;
    }

    await executeRequest<T>(jwt(), requestType, url, body)
      .then((response) => {
        const isGetRequest = requestType === RequestType.get;
        resp = handleResponse(response, showNotification ?? !isGetRequest);
      })
      .catch(async (reason) => {
        handleResponseError(reason);
      })
      .finally(() => {
        if (showLoader !== false) {
          setLoading(false);
        }
      });

    return resp;
  };

  async function executeRequest<T>(
    jwt: string | undefined,
    requestType: RequestType,
    url: string,
    body?: any
  ): Promise<any> {
    switch (requestType) {
      case RequestType.get:
        return await axios.get<T>(
          `${API_PATH}${url}`,
          getGenericRequestConfig(jwt)
        );
      case RequestType.post:
        return await axios.post<T>(
          `${API_PATH}${url}`,
          body,
          getGenericRequestConfig(jwt)
        );
      case RequestType.put:
        return await axios.put<T>(
          `${API_PATH}${url}`,
          body,
          getGenericRequestConfig(jwt)
        );
      case RequestType.deleteEntity:
        return await axios.delete<T>(
          `${API_PATH}${url}`,
          getGenericRequestConfig(jwt)
        );
      default:
        break;
    }
  }

  const handleResponse = <T,>(
    response: any,
    showNotification = false
  ): T | undefined => {
    if (showNotification) {
      notification.success({
        message: 'Success!',
        duration: 3,
      });
    }
    return response.data as T;
  };

  const handleResponseError = async (reason: any): Promise<void> => {
    if (reason.code === 'ERR_NETWORK') {
      navigate(routes.ROUTE_USER_LOGIN);
    } else if (
      reason.response.status === 403 ||
      reason.response.status === 401
    ) {
      Modal.error({
        title: 'Unauthorized',
        content: reason.response.data?.message,
      });
    } else if (reason.response.status === 500) {
      Modal.error({
        title: 'Internal server error',
        content: reason.response.data?.message,
      });
    } else if (reason.response.status < 200 || reason.response.status > 299) {
      Modal.error({
        title: 'Default http error',
        content: reason.response.data?.message,
      });
    }
    return;
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorScreen}>
      <Spin
        spinning={loading}
        size="large"
        style={{ zIndex: '1001', maxHeight: '100%' }}
      >
        <HttpContext.Provider
          value={{
            get,
            post,
            put,
            deleteEntity,
            setLoading,
          }}
        >
          {props.children}
        </HttpContext.Provider>
      </Spin>
    </ErrorBoundary>
  );
};

const getGenericRequestConfig = (
  jwt: string | undefined
): AxiosRequestConfig<any> => {
  const accessToken = jwt;
  const initialHeaders: RawAxiosRequestHeaders = {
    Authorization: `Bearer ${accessToken}`,
  };

  return {
    headers: {
      ...initialHeaders,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
};
