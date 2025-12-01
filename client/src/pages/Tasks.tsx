import { AddTaskForm } from "@/components/AddTaskForm";
import { TaskList } from "@/components/TaskList";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type FilterType = "all" | "active" | "completed";

export default function Tasks() {
  const [filter, setFilter] = useState<FilterType>("all");

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              Minhas Tarefas
            </h1>
            <p className="text-muted-foreground">
              Organize suas tarefas e aumente sua produtividade
            </p>
          </div>

          {/* Add Task Form */}
          <AddTaskForm />

          {/* Filter Buttons */}
          <div className="flex gap-2 justify-center flex-wrap">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              size="sm"
            >
              Todas
            </Button>
            <Button
              variant={filter === "active" ? "default" : "outline"}
              onClick={() => setFilter("active")}
              size="sm"
            >
              Ativas
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
              size="sm"
            >
              Concluídas
            </Button>
          </div>

          {/* Task List */}
          <TaskList filter={filter} />
        </div>
      </div>
    </div>
  );
}
