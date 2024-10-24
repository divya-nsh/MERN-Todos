import React from "react";
import { useAddTodo } from "@/hooks/todoMutions";
import toast from "react-hot-toast";
import { SpinnerGap } from "@phosphor-icons/react";

export default function AddTodoForm() {
  const [input, setInput] = React.useState("");
  const { mutate, isPending } = useAddTodo();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending || !input) return;
    mutate(input, {
      onError() {
        toast.error("Something went wrong, failed to create Todo");
      },
      onSuccess() {
        setInput("");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" bg-white flex overflow-hidden rounded-md"
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className="w-full outline-none py-2.5 px-4 focus:border-blue-400 border rounded-l-md transition-all duration-300 border-r-0"
        placeholder="Add your Task"
        maxLength={150}
      />
      <button
        disabled={isPending || !input}
        className="bg-blue-500 disabled:opacity-90 transition-all duration-300 enabled:active:scale-90 rounded-r-lg text-white px-6 flex items-center justify-center"
      >
        {isPending ? (
          <SpinnerGap size={29} className="animate-spin" />
        ) : (
          <>Add</>
        )}
      </button>
    </form>
  );
}
