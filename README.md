```sh
npx prisma db push && npx prisma generate && npm run dev
```

I've added `data` to `Example` model in [schema.prisma](./prisma/schema.prisma) which is of type `Bytes`
I've also added a [returnBuffer procedure in example router](./src/server/api/routers/example.ts) which
create an entry in `Example` table with given input string and returns the `data` field as `Buffer` type.

The project errors when appending and/or returning the `Buffer` type `data` with error `Unable to transform server response. TRPCError` which points to an internal `transformResult` function within trpc client package.
