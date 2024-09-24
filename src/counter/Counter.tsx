'use client'

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { increment, decrement, incrementByAmount } from "@/redux/slice/CounterSlice";

const Counter = () => {
  const dispatch = useAppDispatch();
  const counterValue = useAppSelector((state) => state.counter.value); 

  return (
    <div>
      <h1>Counter: {counterValue}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
    </div>
  );
};

export default Counter;
