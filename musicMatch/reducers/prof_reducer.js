import { 
    FETCH_PICTURES,
    UPDATE_PICTURES,
    EMPTY_FETCH_PICTURES
} from '../actions/types';
import { REHYDRATE } from 'redux-persist';

const INITIAL_STATE = {
    pictures: []
}
export default function(state = [], action) {
    switch (action.type) {
        // case REHYDRATE:
        //     return { ...state };
        case FETCH_PICTURES:
            return  action.payload;
        case EMPTY_FETCH_PICTURES:
            return [];
        case UPDATE_PICTURES:
            return action.payload;
        default:
            return state;
    }
}