import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../counter/counterSlice";

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <h1>
          Count <span>{count}</span>
        </h1>
      </div>
      <div className="space-x-3">
        <button
          className="p-1 bg-black text-2xl, text-white"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className="p-1 bg-black text-2xl, text-white"
          onClick={() => dispatch(decrement())}
        >
          decrement
        </button>
      </div>
    </div>
  );
}

export default Counter;
