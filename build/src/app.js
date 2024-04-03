"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const uuid_1 = require("uuid");
async function insertMassVersionOne() {
    const startAt = Date.now();
    console.log('Iniciando insertMassVersionOne...');
    try {
        for (let index = 0; index < 10000; index++) {
            const newUUID = (0, uuid_1.v4)();
            const query = 'INSERT INTO public.tabela1 ("name", id) VALUES ($1, $2)';
            await db_1.default.query(query, [newUUID, (0, uuid_1.v4)()]);
        }
        const endDate = Date.now();
        return endDate - startAt;
    }
    catch (error) {
        console.error('Error in insertMassVersionOne:', error);
        return 0;
    }
}
async function insertMassVersionRefactored() {
    const startAt = Date.now();
    console.log('Iniciando insertMassVersionRefactored...');
    try {
        const values = Array.from({ length: 10000 }, () => [(0, uuid_1.v4)(), (0, uuid_1.v4)()]);
        const placeholders = values
            .map((_, i) => `($${2 * i + 1}, $${2 * i + 2})`)
            .join(', ');
        const query = `INSERT INTO public.tabela1 ("name", id) VALUES ${placeholders}`;
        await db_1.default.query(query, values.flat());
        const endDate = Date.now();
        return endDate - startAt;
    }
    catch (error) {
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
runInserts().catch(console.error);
//# sourceMappingURL=app.js.map