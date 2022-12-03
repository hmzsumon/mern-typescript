import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddVideo from './components/add/AddVideo';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import SearchVideos from './components/pages/SearchVideos';
import SignUp from './components/pages/SignUp';
import Video from './components/pages/Video';

const App = () => {
	// useLoadUserQuery();
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/videos/:videoId' element={<Video />} />
				<Route path='/login' element={<Login />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='/add/video' element={<AddVideo />} />
				<Route path='/search/videos' element={<SearchVideos />} />

				<Route path='*' element={<NotFound />}></Route>
			</Routes>
			<ToastContainer />
		</>
	);
};

export default App;
