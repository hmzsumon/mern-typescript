import React, { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../features/auth/authApi';
import Layout from '../Layout/Layout';

const Login = () => {
  const navigate = useNavigate();
  const [login, { isError, isSuccess, isLoading, error }] = useLoginMutation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Login successful');
      navigate('/');
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError, error, navigate]);
  return (
    <Layout>
      <div className='flex items-center justify-center w-full h-screen px-4 '>
        <div className='w-full max-w-[500px] h-auto rounded border '>
          <div className='bg-[#0E75BB] w-full max-w-[500px] rounded-t py-6 px-4  '>
            <h1 className='text-3xl font-bold text-white'>Login</h1>
          </div>
          <form className='my-6' onSubmit={handleSubmit}>
            <div className='w-full px-3 space-y-4'>
              <input
                className={`block w-full px-4 py-3  leading-tight text-gray-700  border-gray-200 border rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500 `}
                id='grid-password'
                name='userName'
                type='text'
                placeholder='User Name'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <div className='flex relative'>
                <input
                  className={`block w-full px-4 py-3  leading-tight text-gray-700  border-gray-200 border rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500 `}
                  name='password'
                  type={passwordShown ? 'text' : 'password'}
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={togglePassword}
                  className=' text-2xl absolute right-3 top-[28%]'
                >
                  {passwordShown ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            </div>
            <div className='flex items-center justify-between w-full px-3 my-6'>
              <button
                type='submit'
                className='inline-flex justify-center px-4 py-2 font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm text-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                {isLoading ? (
                  <BeatLoader color={'#fff'} loading={isLoading} size={10} />
                ) : (
                  'Login'
                )}
              </button>
              <Link to='/sign-up'>
                <span className='text-sm md:text-xl font-medium text-blue-600 hover:underline hover:text-blue-700'>
                  Not a member? Sign Up
                </span>
              </Link>
            </div>
          </form>
          <div className='bg-gray-200 text-right w-fuu max-w-[500px] rounded-b border-t border-gray-300 py-3 px-4  '>
            <Link to='/forgat/password'>
              <span className='text-lg font-semibold text-blue-500 hover:underline hover:text-blue-700'>
                Forgot Password?
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
