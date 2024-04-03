import client from './db';
import {v4 as uuidv4} from 'uuid';

async function insertMassVersionOne(): Promise<number> {
	const startAt = Date.now();

	console.log('Iniciando insertMassVersionOne...');

	try {
		for (let index = 0; index < 10000; index++) {
			const newUUID = uuidv4();
			const query = 'INSERT INTO public.tabela1 ("name", id) VALUES ($1, $2)';
			await client.query(query, [newUUID, uuidv4()]);
		}
		const endDate = Date.now();
		return endDate - startAt;
	} catch (error) {
		console.error('Error in insertMassVersionOne:', error);
		return 0;
	}
}

async function insertMassVersionRefactored(): Promise<number> {
	const startAt = Date.now();

	console.log('Iniciando insertMassVersionRefactored...');

	try {
		const values = Array.from({length: 10000}, () => [uuidv4(), uuidv4()]);
		const placeholders = values
			.map((_, i) => `($${2 * i + 1}, $${2 * i + 2})`)
			.join(', ');
		const query = `INSERT INTO public.tabela1 ("name", id) VALUES ${placeholders}`;
		await client.query(query, values.flat());
		const endDate = Date.now();
		return endDate - startAt;
	} catch (error) {
		console.error('Error in insertMassVersionRefactored:', error);
		return 0;
	}
}

async function runInserts() {
	const [oneTime, refactoredTime] = await Promise.all([
		insertMassVersionOne(),
		insertMassVersionRefactored(),
	]);

	console.log('insertMassVersionOne seconds:', oneTime / 1000);
	console.log('insertMassVersionRefactored seconds:', refactoredTime / 1000);
}

runInserts()
	.then(() => console.log('Finished'))
	.catch(error => console.error('Error:', error))
	.finally(() => client.end());
