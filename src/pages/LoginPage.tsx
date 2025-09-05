import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";
import LoginImg from "../assets/login-img.jpg";
import Logo from "../assets/logo.png";
import { Input } from "../components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import type { LoginFormData } from "../types/index";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (loginError) {
      setError(loginError.message);
      return;
    }

    navigate("/");
  };

  return (
    <div className="flex h-dvh">
      <img className="w-1/2" src={LoginImg} alt="login image" />
      <div className="bg-white w-1/2 p-12.5 flex items-center">
        <div className="w-111.5">
          <img className="mb-12.5" src={Logo} alt="login-logo" />
          <h3 className="text-3xl text-[#0F1015] font-bold mb-1.5">
            Welcome 👋
          </h3>
          <p className="text-base text-[#A4A6AC] mb-7.5">Please login here</p>
          <form onSubmit={handleSubmit} className="mb-25">
            <div className="mb-4">
              <label className="text-xs text-[#0F1015] mb-1.5">Email</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="h-14 p-4 rounded-[10px] outline-none !ring-0 text-base text-[#0F1015]"
              />
            </div>
            <div className="mb-4">
              <label className="text-xs text-[#0F1015] mb-1.5">Password</label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="h-14 p-4 pr-12 rounded-[10px] outline-none !ring-0 text-base text-[#0F1015]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#A4A6AC] hover:text-[#0F1015]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="bg-[#3E54EB] w-full outline-none py-4 h-14 text-white text-base text-center rounded-[10px] hover:bg-[#0F1015] cursor-pointer"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm text-[#0F1015]">
            Don't have an account?{" "}
            <Link
              className="text-[#3E54EB] font-bold hover:text-[#0F1015]"
              to="/registration"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
