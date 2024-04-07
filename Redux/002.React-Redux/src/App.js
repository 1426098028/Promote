import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, addToNum } from './store/modules/counterStore'
import { fetchchannelList } from './store/modules/channeStore'
import './App.css';

function App() {
  const { count } = useSelector(state => state.counter)
  const { channelList } = useSelector(state => state.channel)
  // 获取dispatch函数
  const dispatch = useDispatch()
  useEffect(() => { dispatch(fetchchannelList()) }, [dispatch])
  return (
    <div className="App">
      <button onClick={() => dispatch(decrement())}>-</button>
      {count}
      <button onClick={() => dispatch(increment())} >+</button>
      <button onClick={() => dispatch(addToNum(10))} >设置初始值为10</button>
      <button onClick={() => dispatch(addToNum(20))} >设置初始值为20</button>
      <ol>
        {channelList?.map(item => <li key={item.id}  >{item.name}</li>)}
      </ol>
    </div>
  );
}

export default App;
