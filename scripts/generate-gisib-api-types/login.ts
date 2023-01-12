import axios from 'axios';

export const login = async (): Promise<string> => {
	const { data } = await axios.post(
		`${process.env.GISIB_API_URL}/login`,
		{
			Username: process.env.GISIB_API_USERNAME,
			Password: process.env.GISIB_API_PASSWORD,
			ApiKey: process.env.GISIB_API_KEY,
		},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);
	return data;
};
