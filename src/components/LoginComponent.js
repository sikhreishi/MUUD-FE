import React from 'react';
import { useLoginMutation } from '../redux/apiSlice';

function LoginComponent() {
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async (username, password) => {
    try {
      const result = await login({ username, password }).unwrap();
      console.log('Login successful:', result);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div>
      <button onClick={() => handleLogin('testuser', 'testpassword')} disabled={isLoading}>
        Login
      </button>
      {error && <p>Error: {error.data?.error}</p>}
    </div>
  );
}

export default LoginComponent; 