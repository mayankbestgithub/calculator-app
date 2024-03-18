import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDecimal, addition, substraction, multiplication, division, clear, addNumbers, result, err, output } from './calculatorSlice';
import './Calculator.css';
const Calculator = () => {
    const dispatch = useDispatch();
    const input = useSelector(result);
    const error = useSelector(err);
    const resulting = useSelector(output);
    const [finalResult, setFinalResult] = useState(0);
    const calculate = () => {


        setFinalResult(resulting)
    }
    const clearEveryThing = () => {
        dispatch(clear())
        setFinalResult(0);
    }

    return (<div id="main">
        <span id="display"><p>{!error.found && input}</p><p>{!error.found && finalResult}</p>{error.found && <p>{error.msg}</p>}</span>
        <button id="clear" onClick={() => clearEveryThing()}>AC</button>
        <button id="divide" onClick={() => dispatch(division())}>/</button>
        <button id="multiply" onClick={() => dispatch(multiplication())}>X</button>
        <button id="one" onClick={() => dispatch(addNumbers(1))}>1</button>
        <button id="two" onClick={() => dispatch(addNumbers(2))}>2</button>
        <button id="three" onClick={() => dispatch(addNumbers(3))}>3</button>
        <button id="substract" onClick={() => dispatch(substraction())}>-</button>
        <button id="four" onClick={() => dispatch(addNumbers(4))}>4</button>
        <button id="five" onClick={() => dispatch(addNumbers(5))}>5</button>
        <button id="six" onClick={() => dispatch(addNumbers(6))}>6</button>
        <button id="add" onClick={() => dispatch(addition())}>+</button>
        <button id="seven" onClick={() => dispatch(addNumbers(7))}>7</button>
        <button id="eight" onClick={() => dispatch(addNumbers(8))}>8</button>
        <button id="nine" onClick={() => dispatch(addNumbers(9))}>9</button>
        <button id="decimal" onClick={() => dispatch(addDecimal())}>.</button>
        <button id="zero" onClick={() => dispatch(addNumbers(0))}>0</button>
        <button id="equals" onClick={() => calculate()}>=</button>

    </div>)
}

export default Calculator;