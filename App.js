import React, { useState } from 'react';
import './App.css';

const roles = ['Admin', 'Editor', 'Viewer'];
const permissions = {
  Admin: ['Read', 'Write', 'Delete'],
  Editor: ['Read', 'Write'],
  Viewer: ['Read'],
};

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'Admin' },
    { id: 2, name: 'Jane Smith', role: 'Editor' },
  ]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const [search, setSearch] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);

  // Add or update a user
  const saveUser = () => {
    if (editingUserId) {
      setUsers(
        users.map((user) =>
          user.id === editingUserId
            ? { ...user, name: newUserName, role: newUserRole }
            : user
        )
      );
    } else {
      setUsers([
        ...users,
        { id: users.length + 1, name: newUserName, role: newUserRole },
      ]);
    }
    setNewUserName('');
    setNewUserRole('');
    setEditingUserId(null);
  };

  // Edit user
  const editUser = (user) => {
    setNewUserName(user.name);
    setNewUserRole(user.role);
    setEditingUserId(user.id);
  };

  // Delete user
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>RBAC Dashboard</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {/* Users Table */}
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => editUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit User Form */}
      <h2>{editingUserId ? 'Edit User' : 'Add New User'}</h2>
      <input
        type="text"
        placeholder="Enter user name"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
      />
      <select
        value={newUserRole}
        onChange={(e) => setNewUserRole(e.target.value)}
      >
        <option value="">Select Role</option>
        {roles.map((role, index) => (
          <option key={index} value={role}>
            {role}
          </option>
        ))}
      </select>
      <button onClick={saveUser}>{editingUserId ? 'Save Changes' : 'Add User'}</button>

      {/* Show Permissions based on Role */}
      {newUserRole && (
        <div className="permissions">
          <h3>Permissions for {newUserRole}</h3>
          <ul>
            {permissions[newUserRole].map((permission, index) => (
              <li key={index}>{permission}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
