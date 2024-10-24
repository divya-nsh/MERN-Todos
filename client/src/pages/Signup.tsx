import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/userMutations";
import Alert from "../components/Alert";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { isPending, mutate, error } = useSignup();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isPending) return;
    mutate(formData);
  };

  const handleChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [key]: e.target.value });
    };

  return (
    <div className=" max-w-[400px] mx-auto flex  flex-col justify-center min-h-screen -mt-[2%]">
      <h1 className="flex items-center justify-center gap-2">
        <img className="w-10 h-10" src="/logo2.svg" alt="logo" />
        <span className=" text-3xl font-bold text-neutral-800">Todos</span>
      </h1>

      <form onSubmit={handleSubmit} className=" mt-2 grid gap-3">
        <h2 className="text-2xl text-center text-neutral-800 font-bold">
          Create an account
        </h2>
        {error && <Alert type="error" message={error.message} />}
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            required
            maxLength={40}
            placeholder="Your Name"
            onChange={handleChange("name")}
            value={formData.name}
            className="form-input"
            autoComplete="name"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            required
            maxLength={100}
            placeholder="example@gmail.com"
            type="email"
            onChange={handleChange("email")}
            value={formData.email}
            className="form-input"
            autoComplete="email"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            required
            minLength={8}
            maxLength={64}
            placeholder="xxxxxxxx"
            onChange={handleChange("password")}
            value={formData.password}
            type="password"
            className="form-input"
            autoComplete="new-password"
          />
        </div>

        <button
          disabled={isPending}
          className="active:scale-90 disabled:opacity-90 hover:opacity-90 hover:shadow-md transition-all duration-300 mt-2 bg-blue-600 text-white py-2 rounded-lg"
        >
          {isPending ? <>Signing...</> : <>Signup</>}
        </button>
      </form>
      <p className="text-center mt-4 text-[0.9rem]">
        Aldready have an account?
        <Link
          to="/login"
          className=" text-blue-600 ml-2 hover:underline text-base"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
