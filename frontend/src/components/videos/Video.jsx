import { Link } from 'react-router-dom';

const formatDate = (dt) => {
  return new Date(dt).toUTCString().substring(0, 16);
};

export default function Video({ video }) {
  const { _id, title, duration, author, description, createdAt, thumbnail } =
    video;

  return (
    <div className='col-span-12 sm:col-span-6 md:col-span-3 duration-300 hover:scale-[1.03]'>
      <div className='w-full flex flex-col'>
        <div className='relative'>
          <Link to={`/videos/${_id}`}>
            <img src={thumbnail} className='w-full h-auto' alt={title} />
          </Link>

          <p className='absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py'>
            {duration}
          </p>
        </div>

        <div className='flex flex-row mt-2 gap-2'>
          <div clas='flex flex-col'>
            <Link to={`/videos/${_id}`}>
              <p className='text-slate-900 text-sm font-semibold'>{title}</p>
            </Link>
            <span className='text-gray-400 text-xs hover:text-gray-600'>
              {description}
            </span>
          </div>
        </div>
        <div className=' mt-2 flex  items-center justify-between'>
          <span className='text-gray-400 text-xs hover:text-gray-600'>
            Author: {author}
          </span>

          <p className='text-gray-400 text-xs'>{formatDate(createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
