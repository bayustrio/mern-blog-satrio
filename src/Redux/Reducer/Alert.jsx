import { ALERT } from "../Type/Type";

const initState = {
    loading: false
}


const Alert = (state = initState, action) => {
    switch (action.type) {
        case ALERT:
           return action.payload
        default:
            return state
    }
}


export default Alert
