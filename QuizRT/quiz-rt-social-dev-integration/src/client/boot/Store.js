import {createStore} from "redux"
import reducer from "./reducer"

const initialState = {

}

export const Store = createStore(reducer, initialState)
