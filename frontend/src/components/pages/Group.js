// Group.js
import React, { useState, useEffect } from 'react';
import GroupItem from '../GroupItem';
import GroupFetch from './jsxfiles/Groupfetch';

const Group = () => {
  return (
    <div>
      <GroupFetch />
      <h2>Welcome to the Home Page!</h2>
    </div>
  );
}


export default Group;