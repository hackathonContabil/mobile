import { get, create, update, remove } from '../baseService';
import { createFormatter } from '../../formatters/request/registerFormatters'

export const createUser = async (data) => {
    data = createFormatter(data)
    return await create('/activities', data);
};