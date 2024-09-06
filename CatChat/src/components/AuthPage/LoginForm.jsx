import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextContainer,
  LogoText,
  FormInput,
  FormButton,
  InputWrap,
  LoginWrap,
  LogForm,
  ShowBtn,
  LogoSpan,
} from './LoginForm.styled';
import { loginThunk } from '../../redux/auth/authActions';
import { getCurrentUserThunk } from '../../redux/user/userActions';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { selectAccessToken } from '../../redux/selectors';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector(state => state.auth.error);

  const handleTogglePassword = e => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  const handleLogin = async e => {
    e.preventDefault();
    const credentials = { username, password };
    dispatch(loginThunk(credentials)).then(async res => {
      if (res.meta.requestStatus === 'fulfilled') {
        await dispatch(getCurrentUserThunk(res.payload.access));
      } else {
        console.log('Error', e);
      }
    });
  };

  return (
    <LoginWrap>
      <TextContainer>
        <LogoText>
          <LogoSpan>G</LogoSpan>
          DESK
        </LogoText>
      </TextContainer>
      <LogForm onSubmit={handleLogin}>
        <InputWrap>
          <label>Username</label>
          <FormInput
            style={{ borderColor: error ? '#FF5454' : '#717171' }}
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </InputWrap>
        <InputWrap>
          <label>Password</label>
          <FormInput
            style={{ borderColor: error ? '#FF5454' : '#717171' }}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <ShowBtn onClick={e => handleTogglePassword(e)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </ShowBtn>
        </InputWrap>
        {error && (
          <p style={{ color: 'red' }}>{`Login or password is incorrect*`}</p>
        )}
        <FormButton type="submit">Login</FormButton>
      </LogForm>
    </LoginWrap>
  );
};

export default LoginForm;
