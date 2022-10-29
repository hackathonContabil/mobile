import { axiosDefault } from '../common/utils/clientApi';
import { handleErrors } from '../common/utils/handleErrors';
import { handleSuccess } from '../common/utils/handleSuccess';
import { getItem, saveItem } from '../common/utils/storage'

const axios = axiosDefault();

export const get = async (path) => {
  try {
    const { data } = await axios.get(path, { headers: { Authorization: getItem('TOKEN_KEY') } });
    return handleSuccess(data);
  } catch (error) {
    return handleErrors(error);
  }
};

export const create = async (path, payload) => {
  try {
    const token = await getItem('TOKEN_KEY')
    const { data } = await axios.post(path, payload, { headers: { Authorization: token } });
    return handleSuccess(data);
  } catch (error) {
    return handleErrors(error);
  }
};

export const update = async (path, payload) => {
  try {
    const { data } = await axios.put(path, payload, { headers: { Authorization: getItem('TOKEN_KEY') } });
    return handleSuccess(data);
  } catch (error) {
    return handleErrors(error);
  }
};

export const remove = async (path) => {
  try {
    const { data } = await axios.delete(path);
    return handleSuccess(data);
  } catch (error) {
    return handleErrors(error);
  }
};
