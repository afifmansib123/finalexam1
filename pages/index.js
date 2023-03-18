import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState ,useEffect } from 'react'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

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

    <label> adress:
      <input type = "text" value = {password} onChange={(event)=>setPassword(event.target.value)}/>
    </label>

    <label> Phone:
      <input type = "number" value = {phone} onChange={(event)=>setPhone(event.target.value)}/>
    </label>

    <Button type="submit" variant="success">Save</Button>
    

    
   
    <table striped bordered hover>
<thead>
  <tr>
    <th>#</th>
    <th>Supllier Name</th>
    <th>Supplier Adress</th>
    <th>Supplier Phone number</th>
    <th>Delete</th>
    <th>Update</th>
  </tr>
</thead>
<tbody>
{users.map((user, index) => (
<tr key={user._id}>
<td>{index + 1}</td>
<td>{user.name}</td>
<td>{user.password}</td>
<td>{user.phone}</td>
<td><button onClick={() => handleDelete(user._id)}>Delete</button></td>
<td><button>Update</button></td>
</tr>
))}
</tbody>
</table>

    </form>

    
    
    </>
  )

    }