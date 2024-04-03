import {Client} from 'pg';
import env from './env';

const config = {
	user: env.postgresIntegrationUserPrd,
	password: env.postgresIntegrationPwdPrd,
	host: env.postgresIntegrationHostPrd,
	port: env.postgresIntegrationPortPrd,
	database: env.postgresIntegrationDataBasePrd,
};

const client = new Client(config);

client
	.connect()
	.then(() => {
		console.log('Connected to PostgreSQL database');
	})
	.catch(error => {
		console.error('Error connecting to PostgreSQL:', error);
	});

export default client;
