import { useUserQ } from "@/hooks/queries";
import useClickOutside from "@/hooks/useClickOutside";
import { QuestionMark, SignOut } from "@phosphor-icons/react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { data: user } = useUserQ();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setMenuOpen(false));
  if (!user) throw new Error("User Supposed to be present in nav bar");
  const userIntials =
    user.name[0].toUpperCase() +
    (user.name.split(" ")[1]?.[0]?.toUpperCase() || "");
  return (
    <div className="flex bg-blue-600 h-12 items-center px-2 md:px-6 justify-between">
      <div>
        <Link to="/">
          <h1 className="text-white text-xl sm:text-2xl font-bold flex items-center gap-2">
            <img className="w-8 h-8" src="/logo2.svg" alt="logo" />
            Todos
          </h1>
        </Link>
      </div>
      <div className="flex gap-4 items-center overflow-ellipsis">
        <Link
          to="/support"
          title="Help & Feedback"
          className=" hover:bg-black/20 active:scale-90 transition-all duration-200 rounded-full p-2"
        >
          <QuestionMark size={22} color="white" weight="bold" />
          <span className="sr-only">Help & Feedback</span>
        </Link>
        <div ref={menuRef} className=" relative">
          <button
            title="Manage Account"
            onClick={() => setMenuOpen((v) => !v)}
            className=" active:scale-95 transition-all duration-300"
          >
            <div className="rounded-full border size-9 text-white flex-shrink-0 flex items-center justify-center uppercase bg-black/10">
              {userIntials}
            </div>
          </button>
          {isMenuOpen && (
            <div className=" absolute rounded-lg mt-2 w-[250px] right-0 pt-3 z-50 bg-white shadow-lg border">
              <p className="font-medium w-full overflow-ellipsis px-4 overflow-hidden">
                {user.name}
              </p>
              <p className="px-4 overflow-ellipsis  overflow-hidden text-neutral-700 text-sm">
                {user.email}
              </p>
              <button
                onClick={() => {
                  localStorage.removeItem("authToken");
                  window.location.replace("/login");
                }}
                className="active:scale-90 py-2 
              hover:bg-slate-200 mt-2 px-4 border-t w-full text-sm flex items-center hover:text-blue-500 transition-all gap-1 duration-300 text-neutral-800"
              >
                <SignOut size={22} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
