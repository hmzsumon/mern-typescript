import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Video from '../videos/Video';

const SearchVideos = () => {
  const { state } = useLocation();
  const { searchVideos } = state || [];

  return (
    <Layout>
      <div className='grid grid-cols-12 my-10 px-10 h-screen'>
        {searchVideos?.length > 0 &&
          searchVideos.map((video) => <Video key={video._id} video={video} />)}
      </div>
    </Layout>
  );
};

export default SearchVideos;
