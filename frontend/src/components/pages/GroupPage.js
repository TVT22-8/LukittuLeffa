import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GroupPage = () => {
  let { groupId } = useParams();
  const [groupDetails, setGroupDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        setIsLoading(true);
        // Replace 'your-api-endpoint' with the actual endpoint where your group details can be fetched from
        const response = await fetch(`http://localhost:3002/db/groups/${groupId}`);
        if (!response.ok) {
          throw new Error('Something went wrong while fetching group details.');
        }
        const data = await response.json();
        setGroupDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{groupDetails?.groupname}</h1>
      <p>{groupDetails?.description}</p>
      {/* More group details here */}
    </div>
  );
}

export default GroupPage;