import { useState, useEffect } from 'react'
import axios from 'axios';
import Modal from './components/Modal';
import './App.css'

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/all-users')
      .then((response) => {
        setUsers(response.data)
      }).catch(function (error) {
        console.log(error);
      })
  }, [users])


  const handleChangeName = (event) => {
    setName(event.target.value)
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8000/delete-user/${id}`)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  const addUser = (event) => {
    event.preventDefault()

    axios.post("http://localhost:8000/add-user", {
      name: name,
      email: email
    }).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h1 className='text-2xl'>CRUD with Backend Integration</h1>
        <div className="my-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={addUser}>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                  Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={name}
                  onChange={handleChangeName}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                  Email
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
        <span className="w-full p-0.5 bg-purple-600 lg:w-full"></span>
        <h1 className='text-2xl pt-12'>List of Users</h1>
        {users?.length > 0 ? (
          <ul>
            {users.map((user, index) => (
              <div className="pt-8 flex justify-center items-center" key={index}>
                <li className="pr-3" key={index}> {user.name} ({user.email})</li>
                <Modal id={user.user_id} />
                <button
                  onClick={(event) => {
                    event.preventDefault()
                    deleteUser(user.user_id)
                  }}
                >
                  Delete
                </button>
              </div>

            ))}
          </ul>
        ) : (
          <div className="pt-12">
            <p>No users found</p>
          </div>
        )}
      </div>
    </>

  )
}