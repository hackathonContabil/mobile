import { get, create, update, remove } from '../baseService';
import { loginFormatter } from '../../formatters/request/authFormatters'

export const getAccountOffices = async () => {
  return await get('/accounting-office/public')
}