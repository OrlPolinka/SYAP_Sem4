import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, reset } from "../redux/actions";
import { CounterState } from "../redux/types";
import Button from './Button'
import './Counter.css'

const Counter: React.FC = () => {
    const dispatch = useDispatch();
    const count = useSelector((state: CounterState) => state.value);

  return(
    <div className='d1'>
      <h1>Счетчик: {count}</h1>
      <div>
        <Button title="+" onClick={() => dispatch(increment())}/>
        <Button title="-" onClick={() => dispatch(decrement())}/>
        <Button title="Reset" onClick={() => dispatch(reset())}/>
      </div>
    </div>
  )
}


export default Counter
