CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(120) NOT NULL,
    email VARCHAR(180) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_users_role CHECK (role IN ('USER'))
);

CREATE UNIQUE INDEX uk_users_email_ci ON users (LOWER(email));

CREATE TABLE cars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand VARCHAR(80) NOT NULL,
    model VARCHAR(80) NOT NULL,
    car_year INTEGER NOT NULL,
    plate VARCHAR(20) NOT NULL,
    color VARCHAR(50) NOT NULL,
    photo_url VARCHAR(500),
    user_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cars_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_cars_year CHECK (car_year BETWEEN 1886 AND 2100)
);

CREATE UNIQUE INDEX uk_cars_plate_ci ON cars (LOWER(plate));
CREATE INDEX idx_cars_user_id ON cars (user_id);
CREATE INDEX idx_cars_model_ci ON cars (LOWER(model));
CREATE INDEX idx_cars_brand_ci ON cars (LOWER(brand));
