const sql = require("mssql");

let pool;

async function getPool() {
  if (pool) return pool;

  pool = await sql.connect({
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
      encrypt: true,
      trustServerCertificate: false
    }
  });

  return pool;
}

module.exports = async function (context, req) {
  try {
    const db = await getPool();

    const result = await db.request().query(`
      SELECT TOP 50 id, name, email, created_at
      FROM CustomersTest
      ORDER BY created_at DESC
    `);

    context.res = {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: result.recordset
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: `Customers error: ${error.message}`
    };
  }
};
