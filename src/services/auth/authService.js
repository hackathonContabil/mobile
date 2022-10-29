import { get, create, update, remove } from '../baseService';
import { loginFormatter } from '../../formatters/request/authFormatters'

export const login = async (payload) => {
  payload = loginFormatter(payload)
  return await create('/user/auth', payload)
};

export const validateAuth = async () => {
  const { data } = await get('/user/auth/validate')
  return data.status === "success"
}
