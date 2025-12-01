import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { createTask, deleteTask, getUserTasks, toggleTaskCompletion, updateTask } from "./db";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  tasks: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserTasks(ctx.user.id);
    }),
    
    create: protectedProcedure
      .input(
        z.object({
          title: z.string().min(1).max(500),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await createTask({
          userId: ctx.user.id,
          title: input.title,
          description: input.description || null,
          completed: 0,
        });
        return { success: true };
      }),
    
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().min(1).max(500).optional(),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const updates: { title?: string; description?: string | null } = {};
        if (input.title !== undefined) updates.title = input.title;
        if (input.description !== undefined) updates.description = input.description || null;
        
        await updateTask(input.id, ctx.user.id, updates);
        return { success: true };
      }),
    
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await deleteTask(input.id, ctx.user.id);
        return { success: true };
      }),
    
    toggle: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          completed: z.boolean(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await toggleTaskCompletion(input.id, ctx.user.id, input.completed);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
