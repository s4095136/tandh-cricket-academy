import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

console.log("DB_HOST:", process.env.DB_HOST)
console.log("DB_PORT:", process.env.DB_PORT)
console.log("DB_USER:", process.env.DB_USER)
console.log("DB_NAME:", process.env.DB_NAME)

export const db = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'railway',
  waitForConnections: true,
  connectionLimit: 10,
})