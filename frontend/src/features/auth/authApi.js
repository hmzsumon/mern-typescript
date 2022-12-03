import { apiSlice } from '../api/apiSlice';
import { userLoggedIn, userLoggedOut } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (data) => ({
				url: '/register',
				method: 'POST',
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;

					dispatch(userLoggedIn(result.data.user));
				} catch (err) {
					// do nothing
				}
			},
		}),
		login: builder.mutation({
			query: (data) => ({
				url: '/login',
				method: 'POST',
				body: data,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;

					dispatch(userLoggedIn(result.data.user));
				} catch (err) {
					// do nothing
				}
			},
		}),

		// load user
		loadUser: builder.query({
			query: () => '/me',

			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					dispatch(userLoggedIn(result.data.user));
				} catch (error) {
					console.log(error);
				}
			},
		}),

		// logout
		logoutUser: builder.mutation({
			query: () => ({ url: '/logout', method: 'POST' }),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(userLoggedOut());
				} catch (error) {
					console.log(error);
				}
			},
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLoadUserQuery,
	useLogoutUserMutation,
} = authApi;
