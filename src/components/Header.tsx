import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  console.log("Auth user:", user);
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full sticky top-0 bg-white py-5 z-20">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src={Logo} alt="Real Estate logo" />
          </Link>

          <nav className="flex gap-7">
            <Link
              to="/"
              className="text-[#0F1015] hover:text-[#3E54EB] text-base font-normal"
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className="text-[#0F1015] hover:text-[#3E54EB] text-base font-normal"
            >
              About Us
            </Link>
            <Link
              to="/properties"
              className="text-[#0F1015] hover:text-[#3E54EB] text-base font-normal"
            >
              Properties
            </Link>
          </nav>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="cursor-pointer bg-[#3E54EB] text-white px-5 py-3 rounded-[10px] hover:bg-[#0F1015]"
              >
                Hello, {user.user_metadata?.first_name || "User"}
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-10">
                  <Link
                    to="/add-property"
                    className="block px-4 py-2 text-[#0F1015] hover:text-[#3E54EB]"
                  >
                    Add Property
                  </Link>
                  <Link
                    to="/favorites"
                    className="block px-4 py-2 text-[#0F1015] hover:text-[#3E54EB]"
                  >
                    Liked Properties
                  </Link>
                  <Link
                    to="/my-properties"
                    className="block px-4 py-2 text-[#0F1015] hover:text-[#3E54EB]"
                  >
                    My Properties
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-[#0F1015] cursor-pointer hover:text-[#3E54EB]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white bg-[#3E54EB] hover:bg-[#0F1015] text-base py-3 px-7 rounded-[10px]"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
