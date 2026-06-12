import { db } from '../src/db'

async function main() {
  const [result]: any = await db.query(
    `DELETE FROM testimonials WHERE name = ?`,
    ['Laiba']
  )
  console.log(`Deleted ${result.affectedRows} row(s)`)
  process.exit(0)
}

main().catch((err) => {
  console.error('Failed to delete testimonial:', err)
  process.exit(1)
})
