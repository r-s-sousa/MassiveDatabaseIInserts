"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const env_1 = require("./env");
const config = {
    user: env_1.default.postgresIntegrationUserPrd,
    password: env_1.default.postgresIntegrationPwdPrd,
    host: env_1.default.postgresIntegrationHostPrd,
    port: env_1.default.postgresIntegrationPortPrd,
    database: env_1.default.postgresIntegrationDataBasePrd,
};
const client = new pg_1.Client(config);
client
    .connect()
    .then(() => {
    console.log('Connected to PostgreSQL database');
})
    .catch(error => {
    console.error('Error connecting to PostgreSQL:', error);
});
exports.default = client;
//# sourceMappingURL=db.js.map