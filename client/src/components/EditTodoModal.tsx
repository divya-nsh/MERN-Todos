import { useUpdateTodo } from "@/hooks/todoMutions";
import { EditTodo, Todo } from "@/types";
import { SpinnerGap, X } from "@phosphor-icons/react";
import { FormEvent, useEffect, useRef } from "react";
import toast from "react-hot-toast";

export function EditTodoModal({
  todo,
  open,
  onClose,
}: {
  todo: Todo;
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { mutate, isPending } = useUpdateTodo();
  const formDataRef = useRef<EditTodo>({ _id: todo._id });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate(formDataRef.current, {
      onError(err) {
        toast.error(err.message);
      },
      onSuccess() {
        onClose();
        toast.success("Todo updated successfully");
      },
    });
  };

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  if (!open) return null;
  return (
    <dialog
      onClose={() => {
        onClose();
      }}
      onClick={(e) => {
        if (isPending) return;
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
      ref={dialogRef}
      className="rounded-xl bg-white border shadow-md overflow-hidden w-[500px] pb-6 mx-auto"
    >
      <div className="animate-fadeIn">
        <h1 className="text-lg px-4 bg-blue-500 text-white py-2">EDIT TODO</h1>
        <button
          onClick={() => {
            if (isPending) return;
            onClose();
          }}
          className=" font-bold rounded-full p-2 hover:bg-slate-400 active:border text-white absolute top-1 right-1  "
        >
          <X size={22} weight="bold" />
        </button>
        <form onSubmit={handleSubmit} className="px-4 grid gap-4 mt-2">
          <p className="-mb-3 text-sm text-neutral-600">
            Created on: {new Date(todo.createdAt).toLocaleString()}
          </p>

          <div>
            <label className=" font-medium text-sm text-neutral-700">
              Todo
            </label>
            <input
              required
              maxLength={150}
              type="text"
              className="form-input py-1.5"
              defaultValue={todo.title}
              onChange={(e) => {
                formDataRef.current.title = e.target.value;
              }}
            />
          </div>
          <div>
            <label className=" font-medium text-sm text-neutral-700">
              Note
            </label>
            <textarea
              placeholder="Add a note (Upto 500 characters)"
              maxLength={500}
              className="form-input py-1.5"
              defaultValue={todo.note || ""}
              onChange={(e) => {
                formDataRef.current.note = e.target.value;
              }}
            />
          </div>
          <label className="flex gap-2 text-sm items-center">
            <input
              type="checkbox"
              onChange={(e) => {
                formDataRef.current.completed = e.target.checked;
              }}
              defaultChecked={todo.completed}
            />
            Completed
          </label>
          <button
            onClick={() => {}}
            className="primary-btn w-max px-6"
            disabled={isPending}
          >
            {isPending ? (
              <div className=" px-2">
                <SpinnerGap size={22} className=" animate-spin " />
              </div>
            ) : (
              "Save"
            )}
          </button>
        </form>
      </div>
    </dialog>
  );
}
