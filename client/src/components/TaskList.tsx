import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from "@/lib/trpc";
import { Check, Loader2, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}

interface TaskListProps {
  filter: "all" | "active" | "completed";
}

export function TaskList({ filter }: TaskListProps) {
  const utils = trpc.useUtils();
  const { data: tasks, isLoading } = trpc.tasks.list.useQuery();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const toggleMutation = trpc.tasks.toggle.useMutation({
    onMutate: async ({ id, completed }) => {
      await utils.tasks.list.cancel();
      const previousTasks = utils.tasks.list.getData();
      
      utils.tasks.list.setData(undefined, (old) => {
        if (!old) return old;
        return old.map((task) =>
          task.id === id ? { ...task, completed: completed ? 1 : 0 } : task
        );
      });

      return { previousTasks };
    },
    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        utils.tasks.list.setData(undefined, context.previousTasks);
      }
      toast.error("Erro ao atualizar tarefa");
    },
  });

  const deleteMutation = trpc.tasks.delete.useMutation({
    onMutate: async ({ id }) => {
      await utils.tasks.list.cancel();
      const previousTasks = utils.tasks.list.getData();
      
      utils.tasks.list.setData(undefined, (old) => {
        if (!old) return old;
        return old.filter((task) => task.id !== id);
      });

      return { previousTasks };
    },
    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        utils.tasks.list.setData(undefined, context.previousTasks);
      }
      toast.error("Erro ao deletar tarefa");
    },
    onSuccess: () => {
      toast.success("Tarefa deletada com sucesso");
    },
  });

  const updateMutation = trpc.tasks.update.useMutation({
    onSuccess: () => {
      utils.tasks.list.invalidate();
      setEditingId(null);
      toast.success("Tarefa atualizada com sucesso");
    },
    onError: () => {
      toast.error("Erro ao atualizar tarefa");
    },
  });

  const handleToggle = (task: Task) => {
    toggleMutation.mutate({
      id: task.id,
      completed: task.completed === 0,
    });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate({ id });
  };

  const handleEdit = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  const handleSaveEdit = () => {
    if (!editingId || !editTitle.trim()) return;
    
    updateMutation.mutate({
      id: editingId,
      title: editTitle,
      description: editDescription,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const filteredTasks = tasks?.filter((task) => {
    if (filter === "active") return task.completed === 0;
    if (filter === "completed") return task.completed === 1;
    return true;
  });

  if (!filteredTasks || filteredTasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {filter === "all" && "Nenhuma tarefa ainda. Crie sua primeira tarefa!"}
          {filter === "active" && "Nenhuma tarefa ativa."}
          {filter === "completed" && "Nenhuma tarefa concluída."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task) => (
        <Card key={task.id} className="p-4">
          {editingId === task.id ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                placeholder="Título da tarefa"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground min-h-[80px]"
                placeholder="Descrição (opcional)"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSaveEdit}
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  Salvar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancelEdit}
                  disabled={updateMutation.isPending}
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <Checkbox
                checked={task.completed === 1}
                onCheckedChange={() => handleToggle(task)}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-medium break-words ${
                    task.completed === 1 ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-sm text-muted-foreground mt-1 break-words">
                    {task.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleEdit(task)}
                  className="h-8 w-8"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(task.id)}
                  disabled={deleteMutation.isPending}
                  className="h-8 w-8 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
