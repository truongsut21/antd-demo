// src/features/counter/Counter.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { increment, decrement, incrementByAmount } from './counterSlice';
import { Button} from 'antd';

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <Button type="primary" onClick={() => dispatch(increment())}>+</Button>
        <span className="m-5">{count}</span>
        <Button type="primary" onClick={() => dispatch(decrement())}>-</Button>
      </div>
      <div>
        <Button type="primary" className="mt-4" onClick={() => dispatch(incrementByAmount(5))}>
          Increment by 5
        </Button>
      </div>
    </div>
  );
};

export default Counter;
