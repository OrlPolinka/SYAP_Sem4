import {CounterAction, CounterState, INCREMENT, DECREMENT, RESET} from "./types"

const initialState: CounterState = {
    value: 0
};

export const reducer = (state = initialState, action:CounterAction) : CounterState => {
    switch (action.type){
        case "INCREMENT":
            return {value: state.value + 1};
        case "DECREMENT":
            return {value: state.value - 1};
        case "RESET":
            return {value: 0};
        default:
            return state;
    }
}