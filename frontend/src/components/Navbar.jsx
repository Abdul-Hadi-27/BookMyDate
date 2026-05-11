import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { openAuth } from "../stores/reducers/Ui.slice";
import { asynclogoutUser } from "../stores/actions/UserActions";
import { toast } from "react-toastify";
import {
  Menu,
  Search,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userReducer.users);

  const logoutHandler = async () => {
    dispatch(asynclogoutUser());
    toast.success("Logged Out Successfully");
  };

  return (
    <>
      {/* TOP NAVBAR */}
      <header
        className="
          sticky top-0 z-50
          bg-[#0f0f0f]/95
          backdrop-blur-md
          border-b border-gray-800
          text-white
        "
      >
        <div
          className="
            w-[95%] lg:w-[90%]
            mx-auto
            h-16
            flex items-center justify-between
            gap-4
          "
        >
          {/* LOGO */}
          <Link
            to="/"
            className="
              text-2xl md:text-3xl
              font-black
              tracking-wide
              text-red-500
              whitespace-nowrap
            "
          >
            BookMyDate
          </Link>

          {/* SEARCH BAR */}
          <div
            className="
              hidden md:flex
              flex-1 max-w-3xl
              relative
            "
          >
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search for Movies, Events, Sports and more..."
              className="
                w-full
                bg-[#1c1c1c]
                border border-gray-700
                rounded-xl
                py-2.5 pl-11 pr-4
                outline-none
                text-sm
                focus:border-red-500
                transition
              "
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {/* ADMIN BUTTON */}
            {user?.role !== "admin" && (
              <Link
                to="/admin/login"
                className="
                  hidden lg:flex
                  bg-red-500 hover:bg-red-600
                  px-4 py-2 rounded-lg
                  text-sm font-medium
                  transition
                  active:scale-95
                "
              >
                Admin Login
              </Link>
            )}

            {/* USER */}
            {user ? (
              <div className="flex items-center gap-4">
                {/* PROFILE */}
                <div
                  onClick={() => navigate("/profile")}
                  className="
                    flex items-center gap-2
                    cursor-pointer
                    bg-[#1c1c1c]
                    hover:bg-[#252525]
                    px-3 py-1.5 rounded-xl
                    transition
                  "
                >
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt="profile"
                      className="
                        w-9 h-9
                        rounded-full
                        object-cover
                        border border-gray-700
                      "
                    />
                  ) : (
                    <div
                      className="
                        w-9 h-9 rounded-full
                        bg-red-500
                        flex items-center justify-center
                      "
                    >
                      <User size={18} />
                    </div>
                  )}

                  <div className="hidden sm:flex flex-col">
                    <small className="text-gray-400 text-xs">
                      Welcome
                    </small>

                    <span className="capitalize text-sm font-medium">
                      {user.username}
                    </span>
                  </div>
                </div>

                {/* LOGOUT */}
                <button
                  onClick={logoutHandler}
                  className="
                    flex items-center gap-2
                    bg-[#1c1c1c]
                    hover:bg-red-600
                    px-4 py-2 rounded-xl
                    text-sm
                    transition
                    active:scale-95
                  "
                >
                  <LogOut size={16} />
                  <span className="hidden md:block">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => dispatch(openAuth())}
                className="
                  bg-red-500 hover:bg-red-600
                  px-5 py-2 rounded-xl
                  text-sm font-medium
                  transition
                  active:scale-95
                "
              >
                Sign In
              </button>
            )}

            {/* MOBILE MENU */}
            <button
              className="
                md:hidden
                p-2 rounded-lg
                hover:bg-[#1c1c1c]
              "
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* BOTTOM NAV */}
        <div
          className="
            border-t border-gray-800
            bg-[#161616]
          "
        >
          <div
            className="
              w-[95%] lg:w-[90%]
              mx-auto
              flex items-center justify-between
              py-3
            "
          >
            {/* LINKS */}
            <div
              className="
                flex items-center
                gap-5 md:gap-10
                overflow-x-auto
                scrollbar-hide
              "
            >
              <Link
                to="/movies"
                className="
                  text-sm md:text-base
                  hover:text-red-400
                  transition
                  whitespace-nowrap
                "
              >
                Movies
              </Link>

              <Link
                to="/events"
                className="
                  text-sm md:text-base
                  hover:text-red-400
                  transition
                  whitespace-nowrap
                "
              >
                Events
              </Link>

              <Link
                to="/sports"
                className="
                  text-sm md:text-base
                  hover:text-red-400
                  transition
                  whitespace-nowrap
                "
              >
                Sports
              </Link>
            </div>

            {/* ADMIN SHOW LINK */}
            {user?.role === "admin" && (
              <Link
                to="/admin/add-show"
                className="
                   md:flex
                  items-center gap-2
                  bg-red-500 hover:bg-red-600
                  px-4 py-2 rounded-xl
                  text-sm font-medium
                  transition
                "
              >
                <LayoutDashboard size={16} />
                List Your Shows
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;