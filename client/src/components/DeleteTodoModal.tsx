import { useDeleteTodo } from "@/hooks/todoMutions";
import { SpinnerGap, X } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export function DeleteTodoModal({
  open,
  todoId,
  onClose,
  onSucc,
}: {
  todoId: string;
  onClose: () => void;
  open: boolean;
  onSucc?: () => void;
}) {
  const { mutate, isPending } = useDeleteTodo(); // Your delete action hook
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Delete the todo using the passed todoId
  const deleteTodo = () => {
    if (todoId) {
      mutate(todoId, {
        onError() {
          toast.error("Failed to delete todo, try again later");
        },
        onSuccess() {
          onClose();
          onSucc?.();
          toast.success("Todo deleted successfully");
        },
      });
    }
  };

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  if (!open) return;
  return (
    <dialog
      onClose={onClose}
      ref={dialogRef}
      className="rounded-xl bg-white animate-fadeIn border shadow-md w-[400px] pb-6 mx-auto"
      onClick={(e) => {
        if (isPending) return;
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div>
        <h1 className="text-lg bg-blue-400 py-2 px-4 text-white">
          DELETE TODO
        </h1>
        <button
          onClick={() => onClose()}
          className="font-bold rounded-full p-2 hover:ring-1 ring-neutral-400 active:scale-90 duration-300 transition-all text-white absolute top-1 right-1"
        >
          <X size={22} weight="bold" />
        </button>
        <div className="px-4 mt-2 grid space-y-4">
          <p>Are you sure you want to delete this todo?</p>
          <div className="flex gap-3">
            <button
              onClick={deleteTodo}
              className="danger-btn py-1.5"
              disabled={isPending} // Disable if loading
            >
              {isPending ? (
                <div className=" px-2">
                  <SpinnerGap size={22} className=" animate-spin " />
                </div>
              ) : (
                "Delete"
              )}
            </button>
            <button
              disabled={isPending}
              onClick={() => onClose()}
              className="border rounded-lg hover:opacity-90 transition-all duration-300 enabled:active:scale-90 disabled:opacity-90  text-sm border-slate-300 px-3 py-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
