import {
  Heart,
  IndianRupee,
  LayoutDashboard,
  LogOut,
  Settings,
  Ticket,
  UserPen,
  ChevronRight,
  User,
} from "lucide-react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  asynclogoutUser,
  getcurrentUser,
} from "../stores/actions/UserActions";

import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const user = useSelector(
    (state) => state.userReducer.users
  );

  useEffect(() => {
    dispatch(getcurrentUser());
  }, [dispatch]);

  const LogoutUser = async () => {
    dispatch(asynclogoutUser());

    navigate("/");

    toast.success("Logged Out Successfully");
  };

  const menuItems = [
    {
      icon: <LayoutDashboard size={18} />,
      title: "Dashboard",
      path: "dashboard",
    },
    {
      icon: <UserPen size={18} />,
      title: "Edit Profile",
      path: "edit-profile",
    },
    {
      icon: <Ticket size={18} />,
      title: "My Bookings",
      path: "my-bookings",
    },
    {
      icon: <Heart size={18} />,
      title: "Wishlist",
      path: "wishlist",
    },
    {
      icon: <IndianRupee size={18} />,
      title: "Payments",
      path: "payments",
    },
    {
      icon: <Settings size={18} />,
      title: "Settings",
      path: "settings",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div
        className="
          w-[95%] lg:w-[92%]
          mx-auto
          py-8
          flex flex-col lg:flex-row
          gap-8
        "
      >
        {/* SIDEBAR */}
        <div
          className="
            w-full lg:w-[300px]
            bg-[#171717]
            border border-gray-800
            rounded-3xl
            p-6
            h-fit
            sticky top-24
          "
        >
          {/* PROFILE CARD */}
          <div
            className="
              flex flex-col items-center
              text-center
              pb-6
              border-b border-gray-800
            "
          >
            {/* IMAGE */}
            {user?.image ? (
              <img
                src={user.image}
                alt="profile"
                className="
                  w-24 h-24
                  rounded-full
                  object-cover
                  border-4 border-red-500/30
                  shadow-lg
                "
              />
            ) : (
              <div
                className="
                  w-24 h-24
                  rounded-full
                  bg-red-500
                  flex items-center justify-center
                "
              >
                <User size={38} />
              </div>
            )}

            {/* USER INFO */}
            <h2
              className="
                text-2xl font-bold
                capitalize
                mt-4
              "
            >
              {user?.username}
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              {user?.email}
            </p>

            <span
              className="
                mt-4
                bg-red-500/20
                border border-red-500/30
                text-red-400
                px-4 py-1 rounded-full
                text-xs font-semibold
                uppercase
              "
            >
              {user?.role}
            </span>
          </div>

          {/* MENU */}
          <div className="mt-6 space-y-2">
            {menuItems.map((item, index) => {
              const isActive =
                location.pathname.includes(item.path);

              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`
                    flex items-center justify-between
                    px-4 py-3 rounded-2xl
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-red-500 text-white"
                        : "hover:bg-[#222]"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}

                    <span className="font-medium">
                      {item.title}
                    </span>
                  </div>

                  <ChevronRight size={16} />
                </Link>
              );
            })}
          </div>

          {/* LOGOUT */}
          <button
            onClick={LogoutUser}
            className="
              w-full
              mt-8
              flex items-center justify-center gap-3
              bg-red-500 hover:bg-red-600
              py-3 rounded-2xl
              font-semibold
              transition-all duration-300
              hover:scale-[1.02]
              active:scale-95
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1">
          {/* TOP USER CARD */}
          {user && (
            <div
              className="
                bg-[#171717]
                border border-gray-800
                rounded-3xl
                p-6 md:p-8
                mb-8
                flex flex-col md:flex-row
                md:items-center
                md:justify-between
                gap-6
              "
            >
              {/* LEFT */}
              <div className="flex items-center gap-5">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt="profile"
                    className="
                      w-20 h-20
                      rounded-full
                      object-cover
                      border-4 border-red-500/20
                    "
                  />
                ) : (
                  <div
                    className="
                      w-20 h-20
                      rounded-full
                      bg-red-500
                      flex items-center justify-center
                    "
                  >
                    <User size={32} />
                  </div>
                )}

                <div>
                  <h1
                    className="
                      text-3xl font-bold
                      capitalize
                    "
                  >
                    {user.username}
                  </h1>

                  <p className="text-gray-400 mt-1">
                    {user.email}
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <span
                      className="
                        bg-green-500/20
                        text-green-400
                        border border-green-500/30
                        px-3 py-1 rounded-full
                        text-xs font-semibold
                      "
                    >
                      Active User
                    </span>

                    <span
                      className="
                        bg-red-500/20
                        text-red-400
                        border border-red-500/30
                        px-3 py-1 rounded-full
                        text-xs font-semibold
                        uppercase
                      "
                    >
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="edit-profile"
                  className="
                    bg-blue-500 hover:bg-blue-600
                    px-5 py-3 rounded-2xl
                    font-medium
                    transition-all duration-300
                    hover:scale-105
                  "
                >
                  Edit Profile
                </Link>

                <button
                  onClick={LogoutUser}
                  className="
                    bg-red-500 hover:bg-red-600
                    px-5 py-3 rounded-2xl
                    font-medium
                    transition-all duration-300
                    hover:scale-105
                  "
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* OUTLET */}
          <div
            className="
              bg-[#171717]
              border border-gray-800
              rounded-3xl
              p-6
              min-h-[500px]
            "
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;