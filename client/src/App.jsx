import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'


const App = () => {

  const socket = useMemo(() => io('http://localhost:3000'), [])




  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])



  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('message', message)
    setMessage('')

  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id + ' welcome you are successfully connected!')
    })


    socket.on('receive-msg', (data) => {
      console.log(data)
      setMessages(data)

    })


    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(()=>{

  },[messages])

  
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type='text' onChange={(e) => setMessage(e.target.value)} value={message} />
          <button type='submit'>Send</button>
        </form>
      </div>
      <div>
        {
          messages.map((item, index)=>{
            return <div style={{margin : '20px'}}>
              <p style={{textAlign : `${item.id === socket.id ? 'right' : 'left'}`}}>{item.id}</p>
              <p style={{textAlign : `${item.id === socket.id ? 'right' : 'left'}`}}>{item.message}</p>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default App
