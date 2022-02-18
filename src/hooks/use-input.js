import React, {useReducer} from 'react';

const initialInputState = {
    value: "",
    isTouched: false,
}

const inputReducer = (state, action) => {
    if(action.type === "CHANGE") {
        return {
            value: action.value, isTouched: state.isTouched
        }
    }
    if(action.type === "BLUR") {
        return {
            value: state.value, isTouched: true
        }
    }
    if(action.type === "RESET") {
        return {
            value: "",
            isTouched: false
        }
    }

    return initialInputState;
}

const useInput = (validateValue) => {
   
    const [inputState, dispatchInputAction] = useReducer(inputReducer, initialInputState);
    const isValid = validateValue(inputState.value);
    const valueInputClasses = !isValid && inputState.isTouched;

    const changeInputValueHandler = e => {
        dispatchInputAction({
            type: "CHANGE", value: e.target.value
        })
    }

    const blurInputValueHandler = e => {
        dispatchInputAction({
            type: "BLUR", isTouched: true
        })
    }

    const reset = e => {
        dispatchInputAction({
            type: "RESET"
        })
    }
    
    return {
        value : inputState.value,
        isValid,
        isTouched : inputState.isTouched,
        valueInputClasses,
        changeInputValueHandler,
        blurInputValueHandler,
        reset,
    }
}

export default useInput;