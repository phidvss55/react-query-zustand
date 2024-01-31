### Install dependencies

```
npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql @nestjs/config

yarn add jwt bcrypt class-transformer class-validator cookie-parser

yarn add apollo-server-express graphql-redis-subscriptions ioredis

yarn add graphql-upload@^14.0.0
```

### Run Docker Command

---

To start the database docke and redis for our development

```
docker-compose up
```

### Prisma Commands

---

Serve prisma studio

```
npx prisma studio
```

Run init prisma

```
npx prisma migrate dev --name init
```
