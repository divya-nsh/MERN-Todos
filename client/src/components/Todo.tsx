import { Check, NotePencil, Spinner, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import sound from "@/assets/a.mp3";
import { merge } from "@/utils/general";
import { useUpdateTodo } from "@/hooks/todoMutions";
import toast from "react-hot-toast";
import { Todo } from "@/types";
import { EditTodoModal } from "@/components/EditTodoModal";
import { DeleteTodoModal } from "@/components/DeleteTodoModal";
const completedSound = new Audio(sound);

type Props = Todo & {};
export default function TodoLi({
  title = "",
  completed = false,
  _id,
  updatedAt,
  createdAt,
  note,
}: Props) {
  const [isDeleting, setDeleting] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const updateMut = useUpdateTodo();

  const toogleCheck = async () => {
    completedSound.load();
    updateMut.mutate(
      { _id, completed: !completed },
      {
        onSuccess() {
          if (!completed) completedSound.play();
        },
        onError() {
          toast.error("Failed to toggle complete try again");
        },
      },
    );
  };

  return (
    <div
      className={merge(
        `flex items-center hover:shadow-md relative animate-fadeIn bg-white rounded-md border group transition-all duration-300 shadow-sm overflow-hidden`,
        updateMut.isPending && "animate-pulse",
        completed ? "opacity-90" : "opacity-100",
      )}
    >
      <div className="flex py-3 peer gap-3 w-full overflow-hidden flex-shrink-0 items-center flex-1 px-3">
        {updateMut.isPending ? (
          <Spinner
            className="rounded-full animate-spin text-blue-500"
            size={22}
          />
        ) : (
          <button
            onClick={() => {
              toogleCheck();
            }}
            className={`relative border shrink-0 border-blue-500 transition-all duration-300 active:scale-90 rounded-full size-5 cursor-pointer hover:shadow-lg ${
              completed ? " bg-blue-500" : ""
            }`}
          >
            {updateMut.isPending ? (
              <Spinner className=" animate-spin text-blue-500" size={22} />
            ) : (
              <>
                {completed && (
                  <span className="absolute grid inset-0 place-items-center transition-all duration-300">
                    <Check color="white" weight="bold" />
                  </span>
                )}
              </>
            )}

            <span className="sr-only">
              {completed ? "Check Todo" : "Uncheck Todo"}
            </span>
          </button>
        )}

        <p
          onClick={() => {
            setEditing(true);
          }}
          className={`text-neutral-900 h-full flex items-center cursor-pointer break-words w-full text-[0.95rem] ${
            completed && "line-through opacity-90"
          }`}
        >
          {title}
        </p>
      </div>

      <div className={`px-3 flex self-start items-center h-full`}>
        <button
          className="hover:bg-slate-200 active:scale-90 rounded-full p-2"
          title="Edit todo"
          onClick={() => {
            setEditing((v) => !v);
          }}
        >
          <NotePencil size={22} className=" text-blue-500" weight="fill" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDeleting((v) => !v);
          }}
          className="hover:bg-slate-200 transition-all active:ring-1 duration-300 active:scale-90 rounded-full p-2"
          title="Delete todo"
        >
          <Trash size={21} className="text-red-500" />
        </button>
      </div>

      <DeleteTodoModal
        todoId={_id}
        open={isDeleting}
        onClose={() => setDeleting((v) => !v)}
      />
      <EditTodoModal
        onClose={() => setEditing((v) => !v)}
        open={isEditing}
        todo={{ _id, completed, updatedAt, createdAt, title, note }}
      />
    </div>
  );
}

{
  /* <div
        className={`gap-1 absolute right-3 group-focus:flex group-hover:flex bg-gray-100 ${
          isEditing ? "flex" : "hidden"
        } `}
      >
        <button
          className="hover:bg-white px-1 py-2 active:bg-blue-200 rounded-lg"
          title="Edit todo"
          onClick={handleEdit}
        >
          {isEditing ? (
            <Check size={20} color="#038add" weight="fill" />
          ) : (
            <PencilSimple size={25} color="#038add" weight="fill" />
          )}
        </button>
        <button
          className="hover:bg-white px-1 py-2 active:bg-black rounded-lg"
          title="Delete todo"
        >
          <Trash size={25} color="#f20707" weight="fill" />
        </button>
      </div> */
}
