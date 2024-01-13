// import React, { useState } from 'react';
// import axios from 'axios';

// const Poluch = (props) => {
//   const [data, setData] = useState('');

//   const fetchData = async (format) => {
//     try {
//       const response = await axios.get(`http://localhost:3002/getData/${props.code}/${format}`);
//       setData(response.data);
//     } catch (error) {
//       console.error('Ошибка при получении данных:', error);
//     }
//   };

//   return (
//     <div className='ReplenishmentCont'>
//       <button onClick={() => fetchData('json')}>Получить JSON</button>
//       <button onClick={() => fetchData('xml')}>Получить XML</button>
//       <button onClick={() => fetchData('html')}>Получить HTML</button>
//       <div>
//         <pre>{typeof data === 'object' ? JSON.stringify(data, null, 2) : data}</pre>
//       </div>
//     </div>
//   );
// };

// export default Poluch;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Poluch() {
  const [users, setUsers] = useState([]);
  const [userCode, setUserCode] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [userAccounts, setUserAccounts] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addUsers = async () => {
    try {
      await axios.post('http://localhost:5000/users', {
        code: userCode,
        firstName: userFirstName,
        lastName: userLastName,
        password: userPassword,
        photo: userPhoto,
        accounts: userAccounts.split(',').map((account) => account.trim()), 
      });
      setUserCode('');
      setUserFirstName('');
      setUserLastName('');
      setUserPassword('');
      setUserPhoto('');
      setUserAccounts('');
      fetchData();
    } catch (error) {
      console.error('Error adding user:', error); 
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <input
        type="text"
        placeholder="First Name"
        value={userFirstName}
        onChange={(e) => setUserFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="User Code"
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="User LastName"
        value={userLastName}
        onChange={(e) => setUserLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="User Password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="User Photo"
        value={userPhoto}
        onChange={(e) => setUserPhoto(e.target.value)}
      />
      <input
        type="text"
        placeholder="User Accounts (comma-separated)"
        value={userAccounts}
        onChange={(e) => setUserAccounts(e.target.value)}
      />
      <button onClick={addUsers}>Add User</button>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.code} - {user.firstName} - {user.lastName} - {user.password} - {user.photo} - {user.accounts.join(', ')}
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Poluch;


