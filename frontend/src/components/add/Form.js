// import Success from "../ui/Success";
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { toast } from 'react-toastify';
import { useAddVideoMutation } from '../../features/video/videoApi';
import TextArea from '../ui/TextArea';
import TextInput from '../ui/TextInput';

export default function Form() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [addVideo, { isLoading, isSuccess, isError, error }] =
    useAddVideoMutation();
  const videoEl = useRef(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [video, setVideo] = useState('');
  const [preVew, setPreVew] = useState('');

  const handleVideo = (e) => {
    setVideo(e.target.files[0]);
    setPreVew(URL.createObjectURL(e.target.files[0]));
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setVideo('');
    setPreVew('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('video', video);
    myForm.append('author', user.name);

    addVideo(myForm);

    resetForm();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    if (isSuccess) {
      toast.success('Video uploaded successfully');
      navigate('/');
    }
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError, error, isAuthenticated, navigate]);

  return (
    <form onSubmit={handleSubmit} encType='multipart/form-data'>
      <div className='shadow overflow-hidden sm:rounded-md'>
        <div className='px-4 py-5 bg-white w-full md:w-[95%] border '>
          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6 sm:col-span-3'>
              <TextInput
                title='Video title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className='col-span-6'>
              <TextArea
                title='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* video preview */}
            <div className='col-span-6'>
              <div className='flex flex-col items-start justify-center'>
                <video
                  ref={videoEl}
                  src={preVew}
                  className=' md:w-[25%] md:h-[25%] object-cover'
                  controls
                />
              </div>
            </div>

            {/* Input Video file */}
            <div className='col-span-6 sm:col-span-3'>
              <label className='rounded font-medium bg-gray-400 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2'>
                <input
                  type='file'
                  name='videos'
                  accept='.mp4, .mkv, .avi'
                  multiple
                  className='hidden'
                  onChange={(e) => handleVideo(e)}
                />
                Choose Files
              </label>
            </div>

            {/* <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
              <TextInput
                title='Video Duration'
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div> */}
          </div>
        </div>
        <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
          <button
            disabled={isLoading}
            type='submit'
            className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500'
          >
            {isLoading ? <BeatLoader color='#fff' size={10} /> : 'Upload'}
          </button>
        </div>
      </div>
    </form>
  );
}
