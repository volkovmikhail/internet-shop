import { FETCH_WEARS, ADD_TO_CART } from './actions';

export default function reducer(state, action) {
    switch (action.type) {
        case FETCH_WEARS:
            return {
                catalog: [...action.payload],
            };
        default:
            return state;
    }
}
