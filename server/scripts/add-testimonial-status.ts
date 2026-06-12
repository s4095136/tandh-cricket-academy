import { db } from '../src/db'

async function main() {
  // Add a status column so new public submissions can sit as "pending"
  // until a developer flips them to "approved" directly in the database.
  // Existing rows default to 'approved' so they keep showing on the site.
  const [columns]: any = await db.query(`SHOW COLUMNS FROM testimonials LIKE 'status'`)

  if (columns.length > 0) {
    console.log('Column "status" already exists. Nothing to do.')
  } else {
    await db.query(
      `ALTER TABLE testimonials ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'approved'`
    )
    console.log('Added "status" column (existing rows set to "approved").')
  }

  process.exit(0)
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
