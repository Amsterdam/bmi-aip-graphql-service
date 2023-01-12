import axios from 'axios';

export const getUnits = async (token: string) => {
	const { data } = await axios.post(
		`${process.env.GISIB_API_URL}/Collections/NEN Bouwdeel/WithFilter/items?offset=0&limit=500`,
		[], // No filter, just get 500 items to generate the type from
		{
			headers: {
				accept: '*/*',
				Authorization: token,
				'Content-Type': 'application/json',
			},
		},
	);

	return data;
};
