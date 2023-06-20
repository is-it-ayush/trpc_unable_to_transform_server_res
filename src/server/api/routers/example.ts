import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return `Hello ${input.text}`;
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  /**
   * Takes in a string, and returns a buffer.
   */
  returnBuffer: publicProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.prisma.example.create({
        data: {
          data: Buffer.from(input),
        },
      });

      return res.data;
    }),
});
