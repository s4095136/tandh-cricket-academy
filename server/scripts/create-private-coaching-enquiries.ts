import { db } from '../src/db'

async function main() {
  const [tables]: any = await db.query(`
    SELECT TABLE_NAME FROM information_schema.TABLES
    WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'private_coaching_enquiries'
  `)

  if (tables.length > 0) {
    console.log('Table "private_coaching_enquiries" already exists. Nothing to do.')
    process.exit(0)
  }

  await db.query(`
    CREATE TABLE private_coaching_enquiries (
      id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      full_name     VARCHAR(255)  NOT NULL,
      email         VARCHAR(255)  NOT NULL,
      phone         VARCHAR(50)   DEFAULT NULL,
      grade         VARCHAR(50)   NOT NULL,
      preferred_coach VARCHAR(255) NOT NULL,
      message       TEXT          DEFAULT NULL,
      created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `)

  console.log('Created table "private_coaching_enquiries".')
  process.exit(0)
}

main().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
