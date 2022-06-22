import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:5000/user')
    .then(res=> res.json())
    .then(data=>setUsers(data));
  },)

  const addUserHanlder = (e)=>{
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const usersInfo = {name, email};
    console.log(name, email);

    // post for data

    fetch('http://localhost:5000/user',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usersInfo)
    })
    .then(res=>res.json())
    .then(data=>{
      const newUsers = [...users, data]
      setUsers(newUsers);
    })

  }

  return (
    <div className="App">
      <h1>Users Info {users.length}</h1>
      <form onSubmit={addUserHanlder}>
        <input type="text" name="name" placeholder='name'/>
        <input type="email" name="email" placeholder='email'/>
        <input type="submit"  value="add user"/>
      </form>
      <ul>
      {
        users.map(user=> {
          return <li key={user.id}> {user.name}</li>
        })
      }
      </ul>
      
    </div>
  );
}

export default App;
