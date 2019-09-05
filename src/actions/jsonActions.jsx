import {FETCH_JSON, NEW_JSON} from "./types";
import handleFetchError from "../utils/handle-fetch-error";

export const fetchJson = (url) => dispatch => {
        fetch(url)
            .then(handleFetchError)
            .then(res => res.json())
            .then((result) => {
                dispatch({
                    type: FETCH_JSON,
                    payload: result
                })
                }
            )
            .catch(error => console.log(error));
};