import React from 'react';

const Player = ({ url, title }) => {
  return (
    <div className='w-full h-[400px]'>
      <video controls className='w-full h-full'>
        <source src={url} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Player;
