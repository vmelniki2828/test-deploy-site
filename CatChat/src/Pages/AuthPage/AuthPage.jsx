import React, { useState } from 'react';
import LoginForm from 'components/AuthPage/LoginForm';
import { FormConteiner } from './AuthPage.styled';


const AuthPage = () => {
  const [user, setUser] = useState(null);

  const handleLogin = userData => {
    setUser(userData);
  };

  return (
    <FormConteiner>
      {user ? (
        <div>
          <p>Вы вошли как {user.username}</p>
        </div>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </FormConteiner>
  );
};

export default AuthPage;