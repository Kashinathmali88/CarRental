import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

export const CarContext = createContext();

export const CarContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [cars, setCars] = useState([]);

  const isAuth = async () => {
    try {
      const { data } = await axios.get("/api/user/isLoggedIn", {
        withCredentials: true,
      });
      if (data.success) {
        setIsLoggedIn(data.success);
        await fetchUser();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsLoggedIn(false);
      toast.error(error.response.data.message);
      return false;
    }
  };

  // function to fetch user
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/profile", {
        withCredentials: true,
      });
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error(error.response.data.message);
    }
  };

  // fucntion to feacth cars
  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/user/cars");
      data.success
        ? setCars(data.cars.filter((car) => car.isAvailable === true))
        : toast.error(data.message);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error(error.response.data.message);
    }
  };

  // logout
  const logoutUser = async () => {
    try {
      const { data } = await axios.get("/api/user/logout", {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.success) {
        setIsLoggedIn(false);
        setIsOwner(false);
        setUser({});
        toast.success(data.message);
      } else {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(`Error in logoutUser: ${error.message}`);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchCars();
    isAuth();
  }, []);

  const value = {
    currency,
    navigate,
    location,
    axios,
    toast,
    logoutUser,
    showLogin,
    setShowLogin,
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    isOwner,
    setIsOwner,
    cars,
    setCars,
    fetchUser,
  };
  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
};

export const useCarContext = () => {
  return useContext(CarContext);
};
