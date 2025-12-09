// import { useState } from 'react'
import GetImages from './GetImages'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div >
        <h1 className='flex justify-center'>Image Gallery</h1>

      </div>
      <div className='w-screen flex justify-center items-center'>
        <GetImages/>
      </div>
    </>
  )
}

export default App
