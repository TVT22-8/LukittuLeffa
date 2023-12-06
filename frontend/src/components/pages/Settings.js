// Settings.js

import React from 'react';

const Settings = ({ changeTheme, deleteUser }) => {
  return (
    <div>
      <h2>Settings</h2>
      <button onClick={changeTheme}>Change Theme</button>
      <button onClick={deleteUser}>Delete User</button>
    </div>
  );
};

export default Settings;