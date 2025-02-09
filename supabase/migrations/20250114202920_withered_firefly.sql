-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS wrappers WITH SCHEMA extensions;

-- Create Paddle wrapper
CREATE FOREIGN DATA WRAPPER wasm_wrapper
  HANDLER wasm_fdw_handler
  VALIDATOR wasm_fdw_validator;

-- Create Paddle schema
CREATE SCHEMA IF NOT EXISTS paddle;

-- Create Paddle server
CREATE SERVER paddle_server
  FOREIGN DATA WRAPPER wasm_wrapper
  OPTIONS (
    fdw_package_url 'https://github.com/supabase/wrappers/releases/download/wasm_paddle_fdw_v0.1.1/paddle_fdw.wasm',
    fdw_package_name 'supabase:paddle-fdw',
    fdw_package_version '0.1.1',
    fdw_package_checksum 'c5ac70bb2eef33693787b7d4efce9a83cde8d4fa40889d2037403a51263ba657',
    api_url 'https://api.paddle.com'
  );

-- Create customers table
CREATE FOREIGN TABLE paddle.customers (
  id text,
  name text,
  email text,
  status text,
  custom_data jsonb,
  created_at timestamp,
  updated_at timestamp,
  attrs jsonb
)
  SERVER paddle_server
  OPTIONS (
    object 'customers',
    rowid_column 'id'
  );

-- Create products table
CREATE FOREIGN TABLE paddle.products (
  id text,
  name text,
  tax_category text,
  status text,
  description text,
  created_at timestamp,
  updated_at timestamp,
  attrs jsonb
)
  SERVER paddle_server
  OPTIONS (
    object 'products',
    rowid_column 'id'
  );

-- Create subscriptions table
CREATE FOREIGN TABLE paddle.subscriptions (
  id text,
  status text,
  created_at timestamp,
  updated_at timestamp,
  attrs jsonb
)
  SERVER paddle_server
  OPTIONS (
    object 'subscriptions',
    rowid_column 'id'
  );