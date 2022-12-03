import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Search from '../Layout/Search';
import Videos from '../videos/Videos';

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Layout>
      <section className='pt-6 px-4 md:px-10 pb-20 min-h-[calc(100vh_-_157px)]'>
        {isAuthenticated && (
          <div className='mb-6 space-y-2'>
            <Link
              to='/add/video'
              className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500'
            >
              + Add Video
            </Link>
          </div>
        )}

        <div className=' min-w-[300px] block md:hidden mb-6'>
          <Search />
        </div>

        <div className='grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]'>
          <Videos />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
