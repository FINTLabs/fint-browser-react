import {FETCH_JSON, NEW_JSON} from "../actions/types";

const initialState = {
    json: {},
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_JSON:
            console.log("Recucing:::::")
            return {
                ...state,
                json: action.payload
            };
        case NEW_JSON:
            console.log("NEW_JSON");
            break;
        default:
            return state;
    }
}