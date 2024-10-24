import { startTransition, useMemo, useState } from "react";
import TodoLi from "@/components/Todo";
import AddTodoForm from "@/components/AddTodoForm";
import { merge } from "@/utils/general";
import { useTodosQ } from "@/hooks/queries";
import { CircleNotch } from "@phosphor-icons/react";

export default function Home() {
  const { data: todos = [], isPending, error } = useTodosQ();
  const [filter, setFilter] = useState<"all" | "due" | "completed">("all");

  const totalCompleted = todos.filter((d) => d.completed).length;
  const totalDue = todos.length - totalCompleted;

  // Memoized filtered todos
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "due":
        return todos.filter((v) => !v.completed);
      case "completed":
        return todos.filter((v) => v.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

  const changeFilter = (type: "all" | "due" | "completed") => () => {
    startTransition(() => {
      setFilter(type);
    });
  };

  return (
    <div className="animate-fadeIn max-w-5xl mx-auto mt-6 px-2 sm:px-4">
      <h1 className="text-2xl font-medium text-neutral-800 mb-4">
        My Todos List
      </h1>

      {isPending ? (
        <div className="flex justify-center mt-14">
          <CircleNotch
            size={50}
            className=" animate-spin text-blue-500"
            weight="light"
          />
        </div>
      ) : (
        <>
          <AddTodoForm />

          {/* Filter buttons */}
          <div className="text-sm text-neutral-700 font-medium flex gap-2 mt-3 border-neutral-400">
            <button
              onClick={changeFilter("all")}
              className={merge(
                "border-b-2 pb-2 px-2 transition-all",
                filter === "all"
                  ? "border-neutral-500"
                  : "border-transparent opacity-90",
              )}
            >
              All ({todos.length})
            </button>
            <button
              onClick={changeFilter("due")}
              className={merge(
                "border-b-2 pb-2 px-2 transition-all",
                filter === "due"
                  ? "border-neutral-500"
                  : "border-transparent opacity-90",
              )}
            >
              Due ({totalDue})
            </button>
            <button
              onClick={changeFilter("completed")}
              className={merge(
                "border-b-2 pb-2 px-2 transition-all",
                filter === "completed"
                  ? "border-neutral-500"
                  : "border-transparent opacity-90",
              )}
            >
              Completed ({totalCompleted})
            </button>
          </div>

          {filteredTodos.length === 0 && (
            <p className="text-center text-gray-500 mt-5">
              {filter === "completed"
                ? "No completed todos yet."
                : filter === "due"
                  ? "All tasks are completed!"
                  : "No todos yet."}
            </p>
          )}

          <div className=" gap-3 grid mt-4">
            {(filter === "all"
              ? todos.filter((v) => !v.completed)
              : filteredTodos
            ).map((todo) => (
              <TodoLi {...todo} key={todo._id} />
            ))}

            {filter === "all" && (
              <>
                <div
                  hidden={!totalCompleted}
                  className="border-b mt-1 text-sm pb-1 border-neutral-400"
                >
                  Completed
                </div>
                {todos
                  .filter((v) => v.completed)
                  .map((todo) => (
                    <TodoLi {...todo} key={todo._id} />
                  ))}
              </>
            )}
          </div>
        </>
      )}
      {error && (
        <div className="flex flex-col items-center space-y-6 mt-4 text-center">
          <p className="text-3xl font-semibold text-red-600 dark:text-red-500">
            Oops! Something went wrong
          </p>
          <p className="text-lg text-gray-600 dark:text-neutral-300">
            Failed to fetch. Please try reloading the page or try again later.
          </p>
        </div>
      )}
    </div>
  );
}
