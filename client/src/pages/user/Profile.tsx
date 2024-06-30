import {
  FaArrowRightFromBracket,
  FaMapLocation,
  FaUserGear,
} from "react-icons/fa6";
import { OrderDetails } from "../../components/OrderDetails";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";

interface UserData {
  address: string;
  fname: string;
  lname: string;
  picture: string;
}

export const Profile = () => {
  const navigate = useNavigate();
  const userToken = useSelector((state: any) => state.user.value.token);
  const [userData, set_userData] = useState<UserData>();

  const getUserData = async () => {
    try {
      const user = await axios.get(`/api/user/user-data/${userToken}`);
      set_userData(user.data.user);
    } catch (error: any) {
      console.log(error.response.data.error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const logoutFn = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="flex">
        <div className="details-side">
          <div className="w-1/3">
            <FaUserGear className="ms-auto text-3xl" />
          </div>
          <img
            className="p-img"
            src={userData?.picture ? require(`../../images/user/${userData?.picture}`) : ''}
            alt="Profile"
            width={130}
          />
          <div className="name">{userData?.fname} {userData?.lname}</div>
          <div className="address">
            <FaMapLocation className="inline" /> {userData?.address}
          </div>
          <div onClick={logoutFn} className="logout">
            <FaArrowRightFromBracket className="inline me-1" />
            Log Out
          </div>
          <div className="xl:mb-60 mb-0"></div>
        </div>

        <div className="data-side">
          <div className="xl:w-10/12 lg:px-0 w-full px-2  mx-auto">
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn m-1">
                Select
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
              >
                <li>
                  <span>To Approve</span>
                </li>
                <li>
                  <span>To Ship</span>
                </li>
                <li>
                  <span>Purchase History</span>
                </li>
              </ul>
            </div>

            <div className="card-container flex">
              <div className="basis-full">
                <OrderDetails />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
