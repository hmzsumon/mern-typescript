import React, { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../../features/auth/authApi';
import Layout from '../Layout/Layout';

const SignUp = () => {
  const navigate = useNavigate();
  const [register, { isLoading, isError, isSuccess, error }] =
    useRegisterMutation();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password does not match');
    } else {
      register({ name, username, email, password });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Account created successfully');
      navigate('/login');
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
            <h1 className='text-3xl font-bold text-white'>Sign Up</h1>
          </div>
          <form className='my-6' onSubmit={handleSubmit}>
            <div className='w-full px-3 space-y-4'>
              <input
                className={`block w-full px-4 py-3  leading-tight text-gray-700  border-gray-200 border rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500 `}
                id='grid-name'
                name='name'
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className={`block w-full px-4 py-3  leading-tight text-gray-700  border-gray-200 border rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500 `}
                id='grid-username'
                name='userName'
                type='text'
                placeholder='User Name'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {/* Email */}
              <input
                className={`block w-full px-4 py-3  leading-tight text-gray-700  border-gray-200 border rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500 `}
                id='grid-email'
                name='email'
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              {/* confirm Password */}
              <div className='flex relative'>
                <input
                  className={`block w-full px-4 py-3  leading-tight text-gray-700  border-gray-200 border rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500 `}
                  name='confirmPassword'
                  type={passwordShown ? 'text' : 'password'}
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  'Sign Up'
                )}
              </button>
              <Link to='/login'>
                <span className='text-sm md:text-xl font-medium text-blue-600 hover:underline hover:text-blue-700'>
                  already have an account? Login
                </span>
              </Link>
            </div>
          </form>
          <div className='bg-gray-200 text-right w-fuu max-w-[500px] rounded-b border-t border-gray-300 py-3 px-4  '>
            <span className='text-lg font-semibold text-blue-500 hover:underline hover:text-blue-700'>
              Good Video
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
