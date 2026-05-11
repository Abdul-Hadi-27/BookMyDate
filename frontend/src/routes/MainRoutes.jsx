import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import Events from "../pages/Events";
import Sports from "../pages/Sports";
import AllDetail from "../pages/AllDetail";
import Profile from "../pages/Profile";
import AdminLogin from "../pages/AdminLogin";
import AdminRegister from "../pages/AdminRegister";
import ListShows from "../pages/ListShows";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CreateMovies from "../pages/CreateMovies";
import CreateSports from "../pages/CreateSports";
import CreateEvents from "../pages/CreateEvents";
import AddShow from "../pages/AddShow";
import Dashboard from "../pages/Dashboard";
import MyBookings from "../pages/MyBookings";
import Wishlist from "../pages/Wishlist";
import Payment from "../pages/Payment";
import Settings  from "../pages/Settings";
import EditProfile from "../pages/EditProfile";
import RenderShows from "../pages/RenderShows";
import BookingPage from "../pages/BookingPage";

const MainRoutes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.users);
  useEffect(() => {
    // dispatch(asyncregisterAdmin())
    // dispatch(asyncLoginAdmin())
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path='/register' element={<Register/>}/> */}

        <Route path="/movies" element={<Movies />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/events" element={<Events />} />
        <Route path="/movie/:id" element={<AllDetail />} />
        <Route path="/sport/:id" element={<AllDetail />} />
        <Route path="/event/:id" element={<AllDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/select-show/:id" element={<RenderShows />} />
        <Route path="/select-show/booking/:id" element={<BookingPage />} />
        {/* <Route path='/admin/add-show' /> */}

        {user?.role === "admin" ? (
          <Route path="/admin/add-show" element={<ListShows />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}

        {user?.role === "admin" ? (
          <Route path="/admin/add-movies" element={<CreateMovies />} />
        ) : (
          ""
        )}
        {user?.role === "admin" ? (
          <Route path="/admin/add-sports" element={<CreateSports />} />
        ) : (
          ""
        )}
        {user?.role === "admin" ? (
          <Route path="/admin/add-events" element={<CreateEvents />} />
        ) : (
          ""
        )}
        {user?.role==='admin'?<Route path="/admin/add-show-detail/:id" element={<AddShow/>}/>:''}




        //profile routes

         <Route path="/profile" element={<Profile/>}>
        <Route path="dashboard" element={<Dashboard/>}/>

        <Route path="my-bookings" element={<MyBookings/>}/>
        <Route path="wishlist" element={<Wishlist/>}/>
        <Route path="payments" element={<Payment/>}/>
        <Route path="edit-profile" element={<EditProfile/>}/>
        <Route path="settings" element={<Settings/>}/>

        </Route>
      </Routes>
    </>
  );
};

export default MainRoutes;
