import React, {useState, useEffect} from 'react'
import { fetchAllUsers } from '../fetch'

function Admin() {
    const [users, setUsers] = useState([])

    const ueFetchUsers = async ()=>{
        setUsers(await fetchAllUsers())
    }

    useEffect(()=>{
        ueFetchUsers()
    },[])

  return (
    <div>
        <h2>Admin Dashboard</h2>
        <h3>Users:</h3>
        <ul>
            {users.map((user)=>{
                return(
                    <div key={user.id}>
                        <li>{user.username}</li>
                    </div>
                )
            })}
        </ul>
    </div>
  )
}

export default Admin