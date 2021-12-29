NODE_ENV=development

# System Secrets
PORT = 4000

# Database Secrets
POSTGRES_USER = test
POSTGRES_PASSWORD = test
POSTGRES_DB = test-db
DATABASE_URL = postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}

#JWT Secrets
JWT_SECRET = jwtsecret
ACCESS_TOKEN_SECRET = access_token_secret
REFRESH_TOKEN_SECRET = refresh_token_secret
EMAIL_TOKEN_SECRET = email_token_secret
RESETPASS_TOKEN_SECRET = resetpass_token_secret

# Prisma (Seeding) Secrets
TEST_USER_PASSWORD = test_user_password

# UUID Secrets
UUID_NAMESPACE = 17a77c4a-c44b-4d68-ae41-f6ca386ae151

# Nodemailer Secrets
NODEMAILER_HOST = nodemailer_host
NODEMAILER_PORT = 587
NODEMAILER_USER = nodemailer_user
NODEMAILER_PASS = nodemailer_pass

# Bcrypt Secrets
BCRYPT_SALT = 10
