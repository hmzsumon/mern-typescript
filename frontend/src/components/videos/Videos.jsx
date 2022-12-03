import React from 'react';
import { useSelector } from 'react-redux';
import { useGetVideosQuery } from '../../features/video/videoApi';
import Error from '../ui/Error';
import VideoLoader from '../ui/loaders/VideoLoader';
import Video from './Video';

const Videos = () => {
  const { data, isError, isLoading } = useGetVideosQuery();
  const { searchVideos } = useSelector((state) => state.video);
  const { videos } = data || [];
  let content = null;

  if (isLoading) {
    content = (
      <>
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error message='There was an error' />;
  }

  if (!isLoading && !isError && videos?.length === 0) {
    content = <Error message='No videos found!' />;
  }

  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video) => <Video key={video._id} video={video} />);
  }

  return content;
};

export default Videos;
