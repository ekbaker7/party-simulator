# RPG Party Simulator

If for whatever reason you want to run this code locally, just give it a whirl with

```bash
npm i
# then
npm run dev
```

And then open http://localhost:3000

# Needed Environment Variables

You will need to create an `.env.local` file with the follow environment variables...

```
NEXT_PUBLIC_MONGO_USERNAME=
NEXT_PUBLIC_MONGO_PASSWORD=
NEXT_PUBLIC_MONGO_CLUSTER=
NEXT_PUBLIC_DATABASE_NAME=
NEXT_PUBLIC_DATABASE_CONFIG=retryWrites=true&w=majority
NEXT_PUBLIC_HOST=http://localhost:3000
JWT_SECRET=
```