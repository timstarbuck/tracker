import { AsyncStorage } from 'react-native';

export const SAVE_VALUE = 'SAVE_VALUE';
export const CLEAR_CATEGORY = 'CLEAR_CATEGORY';
export const GET_VALUES = 'GET_VALUES';
const STORAGE_KEY = 'tracker_data';

// https://github.com/erikras/ducks-modular-redux

//todo set up some type of is loading??

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SAVE_VALUE:
        case CLEAR_CATEGORY:
        case GET_VALUES:
            return Object.assign({}, state, { data: action.payload.data, error: action.payload.error });
        default:
            return state;
    }
}

// https://stackoverflow.com/questions/41930443/how-to-async-await-redux-thunk-actions

export const saveValue = (category, value) => {
    return async dispatch => {
        let data = {};
        let error = null;

        try {
            //await AsyncStorage.clear();
            let storeVal = await AsyncStorage.getItem(STORAGE_KEY);
            console.log('from store', storeVal);
            if (storeVal !== null) {
                data = JSON.parse(storeVal);
            }
            if (!data[category]) {
                data[category] = [];
            }
            data[category].push({ timestamp: new Date(), value: value });
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (err) {
            error = err;
            console.log(error);
        }

        dispatch({
            type: SAVE_VALUE,
            payload: {
                data,
                error
            }
        });
    };
};

export const getValues = () => {
    return async dispatch => {
        let data = {};
        let error = null;

        try {
            let value = await AsyncStorage.getItem(STORAGE_KEY);
            data = JSON.parse(value);
        } catch (err) {
            error = err;
            console.log(error);
        }

        dispatch({
            type: GET_VALUES,
            payload: {
                data,
                error
            }
        });
    };
};

export const clearCategory = category => {
    return async dispatch => {
        let data = {};
        let error = null;

        try {
            let value = await AsyncStorage.getItem(STORAGE_KEY);
            data = JSON.parse(value);
            delete data[category];
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (err) {
            error = err;
            console.log(error);
        }

        dispatch({
            type: CLEAR_CATEGORY,
            payload: {
                data,
                error
            }
        });
    };
};
