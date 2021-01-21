import './index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import hg from './hg.jpg'


function Elements() {
  return (
    <div>
      测试一波
      <img  src= {hg} />
    </div>
  )
}

ReactDOM.render(
  <Elements></Elements>,
  document.getElementById('app')
)