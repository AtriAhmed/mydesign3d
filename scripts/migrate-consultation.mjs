import pg from "pg";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const client = await pool.connect();
try {
  await client.query("BEGIN");
  await client.query(`DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_consultation_requests_status') THEN
      CREATE TYPE enum_consultation_requests_status AS ENUM ('new', 'contacted', 'closed');
    END IF;
  END $$;`);
  await client.query(`CREATE TABLE IF NOT EXISTS consultation_requests (
    id serial PRIMARY KEY,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    email varchar NOT NULL,
    phone varchar NOT NULL,
    service varchar NOT NULL,
    message varchar,
    status enum_consultation_requests_status DEFAULT 'new' NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL
  );`);
  await client.query("CREATE INDEX IF NOT EXISTS consultation_requests_status_idx ON consultation_requests (status)");
  await client.query("CREATE INDEX IF NOT EXISTS consultation_requests_updated_at_idx ON consultation_requests (updated_at)");
  await client.query("CREATE INDEX IF NOT EXISTS consultation_requests_created_at_idx ON consultation_requests (created_at)");
  await client.query("ALTER TABLE payload_locked_documents_rels ADD COLUMN IF NOT EXISTS consultation_requests_id integer");
  await client.query("CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_consultation_requests_id_idx ON payload_locked_documents_rels (consultation_requests_id)");
  await client.query(`DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_consultation_requests_fk') THEN
      ALTER TABLE payload_locked_documents_rels
      ADD CONSTRAINT payload_locked_documents_rels_consultation_requests_fk
      FOREIGN KEY (consultation_requests_id) REFERENCES consultation_requests(id) ON DELETE CASCADE;
    END IF;
  END $$;`);
  await client.query("COMMIT");
  console.log("Consultation request schema is ready.");
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  client.release();
  await pool.end();
}
