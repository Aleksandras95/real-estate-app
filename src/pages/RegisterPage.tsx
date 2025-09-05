import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import RegisterImg from "../assets/register-img.jpg";
import Logo from "../assets/logo.png";
import { Eye, EyeOff } from "lucide-react";
import type { RegisterFormData } from "../types/index";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterFormData>({
    first_name: "",
    last_name: "",
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

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    const user = data?.user;
    if (!user) return;

    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        first_name: formData.first_name,
        last_name: formData.last_name,
      },
    });

    if (updateError) {
      setError(updateError.message);
      return;
    }

    const { error: insertError } = await supabase.from("users").insert([
      {
        id: user.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
      },
    ]);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    navigate("/");
  };

  return (
    <div className="flex h-dvh">
      <img className="w-1/2" src={RegisterImg} alt="registration image" />
      <div className="bg-white w-1/2 p-12.5 flex items-center">
        <div className="w-111.5">
          <img className="mb-12.5" src={Logo} alt="registration-logo" />
          <h3 className="text-3xl text-[#0F1015] font-bold mb-1.5">
            Create New Account
          </h3>
          <p className="text-base text-[#A4A6AC] mb-7.5">
            Please enter details
          </p>
          <form onSubmit={handleSubmit} className="mb-25">
            {["first_name", "last_name", "email", "password"].map((field) => (
              <div className="mb-4" key={field}>
                <label className="text-xs text-[#0F1015] mb-1.5 capitalize">
                  {field.replace("_", " ")}
                </label>
                {field === "password" ? (
                  <div className="relative">
                    <Input
                      name={field}
                      type={showPassword ? "text" : "password"}
                      value={formData[field as keyof typeof formData]}
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
                ) : (
                  <Input
                    name={field}
                    type={
                      field === "email"
                        ? "email"
                        : "text"
                    }
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    className="h-14 p-4 rounded-[10px] outline-none !ring-0 text-base text-[#0F1015]"
                  />
                )}
              </div>
            ))}

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="bg-[#3E54EB] w-full outline-none py-4 h-14 text-white text-base text-center rounded-[10px] hover:bg-[#0F1015] cursor-pointer"
            >
              Signup
            </button>
          </form>
          <p className="text-center text-sm text-[#0F1015]">
            Already have an account?{" "}
            <Link
              className="text-[#3E54EB] font-bold hover:text-[#0F1015]"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
