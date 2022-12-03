import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../assets/logo2.png';
import { useLogoutUserMutation } from '../../features/auth/authApi';
import Search from './Search';

const Header = () => {
  const navigate = useNavigate();
  const [logoutUser, { isError, isSuccess, error }] = useLogoutUserMutation();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const handleLogout = () => {
    logoutUser();
  };
  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError, error, navigate]);
  return (
    <nav className='bg-slate-100 shadow-md'>
      <div className='max-w-7xl mx-auto px-5 lg:px-0 flex justify-between py-3 items-center'>
        <Link to='/' className='w-10 h-10 rounded-full p-2 ring-2 ring-red-500'>
          <img className='' src={logo} alt='zakaria' />
        </Link>
        {/* Serch bar */}
        <div className=' min-w-[300px] hidden md:block'>
          <Search />
        </div>
        {isAuthenticated ? (
          <div className='flex items-center gap-4'>
            <p>{user?.name}</p>
            <button
              className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-orange-500'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className='space-x-2'>
            <Link
              to='/sign-up'
              className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-orange-500'
            >
              Sign UP
            </Link>
            <Link
              to='/login'
              className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500'
            >
              Log In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
