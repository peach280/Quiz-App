import React from 'react'
import './App.css'
export default function App() {
  function next()
  {
    setTimeout(()=>{
      window.location.href="3.html"
    },10)
  }
  return(
    <div >
        <img src="5.jpeg" className='c2'/>
        <img src="6.jpg" className="c"/>
        <img src="41.jpg"className="cc1"/>
        <img src="6.png" className="cc"/>
        <h1  className='t'>Welcome to Quizzyverse</h1>
      <p className='p'>where you can play a variety of quizzes of different genres</p>
      <button className='b' onClick={next}>Explore more</button>
    </div>
    
  )
  
}


