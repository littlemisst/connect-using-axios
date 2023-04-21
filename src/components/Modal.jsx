import axios from 'axios';

export default function Modal({ id }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const editUser = (event) => {
    event.preventDefault()

    axios.put(`http://localhost:8000/update-user/${id}`, {
      name: name,
      email: email
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleChangeName = (event) => {
    setName(event.target.value)
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  };

  return (
    <div className='mr-3'>
      <label htmlFor="my-modal-3" className="btn normal-case bg-indigo-600 text-white">Edit</label>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <div className="mt-2">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                    Name
                  </label>
                </div>
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
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-wgite">
                    Email
                  </label>
                </div>
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
            </form>
          </div>
          <div className="modal-action">
            <button className="btn" onClick={editUser}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  )
}
