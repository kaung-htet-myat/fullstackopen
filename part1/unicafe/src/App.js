import React, {useState} from 'react';
import Button from './components/Button';
import Stats from './components/Stats';

const App = () => {

  const [stats, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onButtonClick = (name) => {
    setStats({
      ...stats,
      [name]: stats[name] + 1, 
    });
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button name={"good"} onClick={() => onButtonClick("good")}/>
      <Button name={"neutral"} onClick={() => onButtonClick("neutral")}/>
      <Button name={"bad"} onClick={() => onButtonClick("bad")}/>
      <Stats stats={stats}/>
    </div>
  );
}

export default App;
