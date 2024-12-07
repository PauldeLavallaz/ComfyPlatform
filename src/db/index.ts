import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Use connection string from environment variable
const connectionString = process.env.DATABASE_URL!

// Create postgres connection
const client = postgres(connectionString)

// Create drizzle database instance
export const db = drizzle(client, { schema }) 