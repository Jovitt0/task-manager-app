import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: userId,
    openId: `test-user-${userId}`,
    email: `user${userId}@example.com`,
    name: `Test User ${userId}`,
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("tasks router", () => {
  it("should create a new task", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.tasks.create({
      title: "Test Task",
      description: "This is a test task",
    });

    expect(result).toEqual({ success: true });
  });

  it("should list user tasks", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a task first
    await caller.tasks.create({
      title: "Test Task for List",
      description: "Description",
    });

    const tasks = await caller.tasks.list();

    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBeGreaterThan(0);
    expect(tasks[0]).toHaveProperty("id");
    expect(tasks[0]).toHaveProperty("title");
    expect(tasks[0]).toHaveProperty("userId");
  });

  it("should toggle task completion", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a task
    await caller.tasks.create({
      title: "Task to Toggle",
    });

    // Get the task
    const tasks = await caller.tasks.list();
    const task = tasks[0];

    if (!task) {
      throw new Error("Task not found");
    }

    // Toggle completion
    const result = await caller.tasks.toggle({
      id: task.id,
      completed: true,
    });

    expect(result).toEqual({ success: true });

    // Verify the task is completed
    const updatedTasks = await caller.tasks.list();
    const updatedTask = updatedTasks.find((t) => t.id === task.id);
    expect(updatedTask?.completed).toBe(1);
  });

  it("should update task title and description", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a task
    await caller.tasks.create({
      title: "Original Title",
      description: "Original Description",
    });

    // Get the task
    const tasks = await caller.tasks.list();
    const task = tasks[0];

    if (!task) {
      throw new Error("Task not found");
    }

    // Update the task
    const result = await caller.tasks.update({
      id: task.id,
      title: "Updated Title",
      description: "Updated Description",
    });

    expect(result).toEqual({ success: true });
  });

  it("should delete a task", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a task
    await caller.tasks.create({
      title: "Task to Delete",
    });

    // Get the task
    const tasks = await caller.tasks.list();
    const task = tasks[0];

    if (!task) {
      throw new Error("Task not found");
    }

    const taskId = task.id;

    // Delete the task
    const result = await caller.tasks.delete({
      id: taskId,
    });

    expect(result).toEqual({ success: true });

    // Verify the task is deleted
    const remainingTasks = await caller.tasks.list();
    const deletedTask = remainingTasks.find((t) => t.id === taskId);
    expect(deletedTask).toBeUndefined();
  });

  it("should not allow user to access another user's tasks", async () => {
    const { ctx: ctx1 } = createAuthContext(1);
    const { ctx: ctx2 } = createAuthContext(2);
    const caller1 = appRouter.createCaller(ctx1);
    const caller2 = appRouter.createCaller(ctx2);

    // User 1 creates a task
    await caller1.tasks.create({
      title: "User 1 Task",
    });

    // User 2 should not see User 1's tasks
    const user2Tasks = await caller2.tasks.list();
    const user1Task = user2Tasks.find((t) => t.title === "User 1 Task");
    expect(user1Task).toBeUndefined();
  });
});
