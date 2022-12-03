import { apiSlice } from '../api/apiSlice';
import { setVideos } from './videoSlice';

export const videoApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all videos
		getVideos: builder.query({
			query: () => '/videos',
			providesTags: ['Videos'],
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					dispatch(setVideos(result.data.videos));
				} catch (error) {
					console.log(error);
				}
			},
		}),

		// add video
		addVideo: builder.mutation({
			query: (data) => ({
				url: '/videos',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Videos'],

			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					dispatch(setVideos(result.data.videos));
				} catch (error) {
					console.log(error);
				}
			},
		}),

		// get a single video
		getVideo: builder.query({
			query: (id) => `/video/${id}`,
			providesTags: (result, error, arg) => [{ type: 'Video', id: arg }],
		}),

		// delete a video
		deleteVideo: builder.mutation({
			query: (id) => ({
				url: `/videos/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Videos'],
		}),

		getRelatedVideos: builder.query({
			query: ({ id, title }) => {
				const tags = title.split(' ');
				const likes = tags.map((tag) => `title_like=${tag}`);
				const queryString = `/videos?${likes.join('&')}&_limit=4`;
				return queryString;
			},
			providesTags: (result, error, arg) => [
				{ type: 'RelatedVideos', id: arg.id },
			],
		}),
	}),
});

export const {
	useGetVideosQuery,
	useAddVideoMutation,
	useGetVideoQuery,
	useDeleteVideoMutation,
	useGetRelatedVideosQuery,
} = videoApi;
