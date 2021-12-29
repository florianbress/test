# Minimum reproduction Repository

## Basics

- Test User Password is: `test_user_password`

## Configuration

1. Rename the `.env.tpl` to `.env`. Secrets are already set.

1. Spin up the container with: `docker-compose up`.

2. Migrate the Database: `yarn migrate:dev`.

3. Seed the database with dummy data: `yarn prisma:seed`

4. Start the application: `yarn dev`
