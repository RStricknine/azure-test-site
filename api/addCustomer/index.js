const sql = require("mssql");

module.exports = async function (context, req) {

const config = {
user: process.env.SQL_USER,
password: process.env.SQL_PASSWORD,
server: process.env.SQL_SERVER,
database: process.env.SQL_DATABASE,
options: {
encrypt: true
}
};

try {

await sql.connect(config);

await sql.query`
INSERT INTO CustomersTest (name,email)
VALUES (${req.body.name},${req.body.email})
`;

context.res = {
status: 200,
body: "Customer saved"
};

}
catch(error){

context.res = {
status: 500,
body: error.message
};

}

};
