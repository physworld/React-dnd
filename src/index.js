import React from 'react';
import ReactDOM from 'react-dom'
import {MainBox} from './MainBox'

//Возвращает высший компонент
function App(){
  return(
    <MainBox />
  )
}

ReactDOM.render(
  <React.StrictMode>
  <App />
  </React.StrictMode>,
  document.getElementById('root'))