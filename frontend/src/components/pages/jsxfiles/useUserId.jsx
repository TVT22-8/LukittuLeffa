// useUserId.js
import { useAuth } from './Logging';

const useUserId = () => {
  const { user } = useAuth();
  

  if (!user) {
    // Handle the case where user or user.id is not available
    console.error('No user found');

    return null;
  }
  return user;
};

export default useUserId;
