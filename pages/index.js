import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState ,useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [phone,setPhone] = useState('')
  const [users, setUsers] = useState([])

 

  const handlesubmit = async (event) => {
      event.preventDefault()

      const response = await fetch('/api/users/create',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({name,password,phone})
      })
      if (response.ok) {
        console.log('paykhana')
      } else {
        // handle error
      }
  }


  
  
    

  const handleDelete = async (id) => {
    const response = await fetch(`/api/users/delete?id=${id}`, { method: 'DELETE' })
    const data = await response.json()
    setUsers(data)
  }

  useEffect(()  => {
    const fetchData = async () => {
      const response = await fetch('/api/users/read')
      const data = await response.json()
      setUsers(data)
    }
    fetchData()
  },[])


  

  return (
    <>

    <h1>paykhan</h1>
    <form onSubmit={handlesubmit}>


    <label> Name:
      <input type = "text" value = {name} onChange={(event)=>setName(event.target.value)}/>
    </label>

    <label> password:
      <input type = "password" value = {password} onChange={(event)=>setPassword(event.target.value)}/>
    </label>

    <label> Phone:
      <input type = "number" value = {phone} onChange={(event)=>setPhone(event.target.value)}/>
    </label>

    <button type="submit">register</button>
    

    
   
    <ul>
    {users.map((user) => (
          <li key={user._id}>
            name : {user.name} password: {user.password} Phone: {user.phone}
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>

    </form>

    
    
    </>
  )

    }