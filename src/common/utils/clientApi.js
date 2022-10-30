import axios from 'axios';
import { getItem, saveItem } from '../../common/utils/storage'


export const axiosDefault = () => {
  // const token = getItem('TOKEN');
  const configs = {
    baseURL: 'http://10.0.12.93:3000/api/v1',
    headers: {
      // Authorization: token ? `Bearer ${token}` : undefined,
      withCredentials: true,
    },
    withCredentials: true,
  };

  return axios.create(configs);
};
