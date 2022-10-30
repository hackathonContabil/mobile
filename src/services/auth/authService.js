import { get, create, update, remove } from '../baseService';
import { loginFormatter } from '../../formatters/request/authFormatters'

export const login = async (payload) => {
  payload = loginFormatter(payload)
  return await create('/user/auth', payload)
};

export const validateAuth = async () => {
  // return true
  return await get('/user/auth/validate')
}

export const allowShareAccountData = async () => {
  return await create('/user/client/share-bank-account-data')
}
