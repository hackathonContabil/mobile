import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
});

const getItem = async (key) => {
    try {
        return await storage
            .load({
                key,
                autoSync: true,
                syncInBackground: true,
                syncParams: {
                    someFlag: true
                }
            })
    } catch (error) {
        return null
    }
}

const saveItem = async (key, data) => {
    return await storage.save({
        key,
        data,
        expires: null
    });
}

export { getItem, saveItem };