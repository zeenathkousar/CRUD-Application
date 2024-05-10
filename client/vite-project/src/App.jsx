import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Axios from 'axios'

function App() {

  const [studname, setName] = useState('')
  const [rollno, setRollno] = useState('')
  const [marks, setMarks] = useState(0)

  function addnewData() {
    Axios.post('http://localhost:3001/adddata', { studname, rollno, marks })
  }



  return (
    <>
      <h1>hello world</h1>
      <div className='container'>
        <label htmlFor="studname">Name:</label>
        <input type="text" name='studname' onChange={(e)=>setName(e.target.value)}/> <br/><br/>

        <label htmlFor="rollno">Name:</label>
        <input type="text" name='rollno' onChange={(e)=>setRollno(e.target.value)}/> <br/><br/>

        <label htmlFor="marks">Name:</label>
        <input type="text" name='marks' onChange={(e)=>setMarks(e.target.value)}/> <br/><br/>

        <button onClick={addnewData}>Add New Student</button>

      </div>
    </>
  );
}

export default App
