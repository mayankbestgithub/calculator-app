import { createSlice } from '@reduxjs/toolkit';

const calculatorSlice = createSlice({
    name: 'calculator',
    initialState: { temp: [], error: { found: false, msg: '' }, result: 0 },
    reducers: {
        clear(state) {
            state.temp = [];
            state.error.found = false;
            state.error.msg = "";
            state.result = 0;
        },
        addition(state) {

            state.temp.push('+')

        },
        substraction(state) {

            state.temp.push('-');

        },
        multiplication(state) {

            state.temp.push('*');

        },
        division(state) {

            state.temp.push('/');
        },
        addDecimal(state) {
            let flag = false;
            let i = state.temp.length - 1;
            while (i !== -1) {
                if (['+', '-', '*', '/'].includes(state.temp[i])) {
                    break;
                } else if (state.temp[i] === ".") {
                    flag = true;
                    break;
                }

                i--;
            }
            if (flag) {
                state.error.found = true;
                state.error.msg = "Malformed Expression"

            }
            state.temp.push('.');
        },
        addNumbers(state, action) {
            let maximumInt = Number.MAX_SAFE_INTEGER;

            if (action.payload === 0 && (state.temp[state.temp.length - 1] === "/")) {
                state.error.found = true;
                state.error.msg = "Division by Zero is undefined"
            }
            else {
                // 2*6 + 5*9 -7/2
                state.temp.push(action.payload);

                let t = [];
                let result = '';
                let i = 0;
                if (['+', '-', '*', "/"].includes(state.temp[0])) {
                    state.error.found = true;
                    state.error.msg = "Malformed Expression";
                    return;
                }
                while (i <= state.temp.length - 1) {

                    if (!['+', '-', '*', "/"].includes(state.temp[i])) {
                        result += state.temp[i];
                        if (Number(result) > maximumInt) {
                            state.error.found = true;
                            state.error.msg = "Max limit reached";
                            break;
                        }
                    } else {
                        t.push(result);
                        if (t.length === 3) {
                            state.result = operation(t);
                            t = [];
                            t.push(state.result.toString())
                        }
                        let operator = state.temp[i];
                        t.push(operator);
                        result = '';
                    }
                    i++;
                }
                if (t.length > 0 && result) {
                    t.push(result);
                    state.result = operation(t);
                }
                function add(a, b) {
                    return parseInt(a) + parseInt(b);
                }
                function sub(a, b) {
                    return parseInt(a) - parseInt(b);
                }
                function mul(a, b) {
                    return parseInt(a) * parseInt(b);
                }
                function div(a, b) {
                    return parseFloat(a) / parseFloat(b);
                }
                function operation(t) {
                    let result = 1;
                    let [first, operator, second] = t;
                    if (isNaN(+first) || !['+', '-', '*', "/"].includes(operator) || isNaN(+second)) {
                        state.error.found = true;
                        state.error.msg = "Malformed expression";
                    }
                    console.log(t);
                    switch (operator) {
                        case '+':
                            result *= add(first, second);
                            break;
                        case '-':
                            result *= sub(first, second);
                            break;
                        case '*':
                            result *= mul(first, second);
                            break;
                        case '/':
                            result *= div(first, second);
                            break;
                        default:
                            state.error.found = true;
                            state.error.msg = "Malformed expression";
                            break;

                    }

                    return result;
                }


            }
        },

    }

})
export const { addDecimal, clear, addition, substraction, multiplication, division, addNumbers } = calculatorSlice.actions;
export const result = state => state.calculator.temp;
export const output = state => state.calculator.result;
export const err = state => state.calculator.error;


export default calculatorSlice.reducer