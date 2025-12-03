// Prisma v7 configuration for PostgreSQL
export default {
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
}
