import { axiosDefault } from '../common/utils/clientApi';
import { handleErrors } from '../common/utils/handleErrors';
import { handleSuccess } from '../common/utils/handleSuccess';
import { getItem, saveItem } from '../common/utils/storage'

const axios = axiosDefault();

export const get = async (path) => {
  try {
    const token = await getItem('TOKEN')
    const { data } = await axios.get(path, { headers: { Authorization: `Bearer ${token}` } });
    return handleSuccess(data);
  } catch (error) {
    return handleErrors(error);
  }
};

export const create = async (path, payload) => {
  try {
    const token = await getItem('TOKEN')
    // const data = {"data": {"isAccountant": false, "isAdmin": false, "isClient": true, "isSharingBankAccountData": false, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNBZG1pbiI6ZmFsc2UsImlzQ2xpZW50Ijp0cnVlLCJpc0FjY291bnRhbnQiOmZhbHNlLCJpc1NoYXJpbmdCYW5rQWNjb3VudERhdGEiOmZhbHNlLCJpYXQiOjE2NjcwNjk3NTMsImV4cCI6MTY2NzE1NjE1M30.78_4-a-AHVJCBnmuTkst-vxCs64Zlk8aJ5ytEjmrJCM"}, "status": "success"}
    const { data } = await axios.post(path, payload, { headers: { Authorization: `Bearer ${token}` } });
    return handleSuccess(data);
  } catch (error) {
    return handleErrors(error);
  }
};

export const update = async (path, payload) => {
  try {
    const token = await getItem('TOKEN')
    const { data } = await axios.put(path, payload, { headers: { Authorization: `Bearer ${token}` } });
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
