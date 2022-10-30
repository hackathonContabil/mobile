import { get, create, update, remove } from '../baseService';
import { addBankFormatter } from '../../formatters/request/addBankFormatters'

export const getBanks = async () => {
  return await get('/bank-account')
};

export const addBank = async (payload) => {
  payload = addBankFormatter(payload)
  return await create('/bank-account', payload)
}

export const getBalance = async() => {
  return await get('/bank-account/balance')
}

export const getTransactions = async () => {
  return await get('/bank-account/transactions?page=0&limit=20')
}