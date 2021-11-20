import { FETCH_WEARS} from './actions';

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
