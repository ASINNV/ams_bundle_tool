CREATE DATABASE ams;
\c ams;

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TABLE services (
    id SMALLSERIAL PRIMARY KEY,
    code CHARACTER(5) UNIQUE,
    name VARCHAR(60) UNIQUE,
    description TEXT,
    price INTEGER,
    capacity BOOLEAN DEFAULT true,
    relatedGoals CHARACTER(5)[],
    dependencies CHARACTER(5)[],
    created TIMESTAMPTZ DEFAULT NOW(),
    updated TIMESTAMPTZ
);

CREATE TABLE bundles (
    id SMALLSERIAL PRIMARY KEY,
    name VARCHAR(60) UNIQUE,
    description TEXT,
    price INTEGER,
    discount REAL,
    popularity SMALLINT UNIQUE,
    created TIMESTAMPTZ DEFAULT NOW(),
    updated TIMESTAMPTZ
);

CREATE TABLE clients (
    id SMALLSERIAL PRIMARY KEY,
    company_name VARCHAR(60) UNIQUE,
    contact_name VARCHAR(60),
    email VARCHAR(60),
    phone VARCHAR(30),
    discount REAL,
    created TIMESTAMPTZ DEFAULT NOW(),
    updated TIMESTAMPTZ
);

CREATE TABLE projects (
    id SMALLSERIAL PRIMARY KEY,
    client_id SMALLINT references clients(id),
    name VARCHAR(60),
    status SMALLINT DEFAULT 0,
    payment_method SMALLINT,
    total INTEGER,
    bundle_name VARCHAR(40),
    bundle_id SMALLINT DEFAULT -1,
    services CHARACTER(5)[],
    start_date DATE,
    due_date DATE,
    end_date DATE,
    created TIMESTAMPTZ DEFAULT NOW(),
    updated TIMESTAMPTZ
);

CREATE TABLE bundleRelations (
  id SMALLSERIAL PRIMARY KEY,
  bundle_id INTEGER,
  service_id INTEGER,
  created TIMESTAMPTZ DEFAULT NOW(),
  updated TIMESTAMPTZ
);

CREATE TABLE goals (
    id SMALLSERIAL PRIMARY KEY,
    code CHARACTER(5) UNIQUE,
    name VARCHAR(60),
    description TEXT,
    created TIMESTAMPTZ DEFAULT NOW(),
    updated TIMESTAMPTZ
);

CREATE TABLE goalRelations (
  id SMALLSERIAL PRIMARY KEY,
  goal_id INTEGER,
  service_id INTEGER,
  created TIMESTAMPTZ DEFAULT NOW(),
  updated TIMESTAMPTZ
);

CREATE TRIGGER update_service BEFORE UPDATE ON services FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_bundle BEFORE UPDATE ON bundles FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_client BEFORE UPDATE ON clients FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_project BEFORE UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_goal BEFORE UPDATE ON goals FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_bundle_relation BEFORE UPDATE ON bundleRelations FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_goal_relation BEFORE UPDATE ON goalRelations FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
