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

    <h1>Supplier Management page</h1>
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
    

    
   
    <Table striped bordered hover>
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
<td><Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button></td>
<td><Button variant="warning">Update</Button></td>
</tr>
))}
</tbody>
</Table>

<a href="/login">Varify Supplier Credantials :</a>
<div><br/>
<p>**USER GUIDE*** <br/> This is the Sullier management page created by @AfifMansibChowdhury. You can add list of suppliers using the 'Add New Supplier' Button. Once the supplier is added , there will be an option to update and delete the supplier.</p>
<p>Functionalities  </p><br/>
<p>Management page : ok</p><br/>
<p>Table with Proper Data : ok</p><br/>
<p>Adding new Supplier : ok</p><br/>
<p>Deleting Suppliers : ok</p><br/>
<p>Updating page : NOT WORING</p><br/>
<p>Additional Functionality: You can use a sign in postion to see if you are a registered suppler or not. enter your name and adress to varify that. Also Note that Once you add/delete a new supplier reload to see the changes.</p>
</div>

    </form>

    
    
    </>
  )

    }