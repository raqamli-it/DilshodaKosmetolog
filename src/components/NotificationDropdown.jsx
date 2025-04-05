import { useEffect, useState } from "react";
import { Bell, Phone } from 'lucide-react';
import { DataService } from "../config/DataService";
import { endpoints } from "../config/endpoinds";
import { Link, useNavigate } from "react-router-dom";



const NotificationDropdown = () => {
  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate()
  const fetchData = async () => {
    const response = await DataService.get(endpoints.userCount);

    setApiData(response?.tomorrow_patient_count);


  };
  useEffect(() => {
    fetchData();


  }, []);



  const [apiDataIn, setApiDataIn] = useState([]);
  const fetchDataIn = async () => {
    const response = await DataService.get(endpoints.userCountNs);
    console.log(response, "Notifif list");
    setApiDataIn(response);

  };
  useEffect(() => {
    fetchDataIn();


  }, []);





  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        className="hover:text-dark-900 relative bottom-0 flex  items-center justify-center rounded-full   text-gray-500 transition-colors"
        onClick={() => {
          setDropdownOpen(!dropdownOpen);
          setNotifying(false);
        }}
      >
        {apiData < 1 ? (
          ""
        ) : (
          <span
            className={`absolute top-[1px] right-[1px] z-1 h-[0.5rem] w-[0.5rem] rounded-full bg-yellow-500 ${notifying ? "flex" : "hidden"
              }`}
          >
            <span className="absolute -z-1  inline-flex  h-[0.5rem]  w-[0.5rem] animate-ping rounded-full bg-yellow-500 "></span>
          </span>
        )}
        <Bell size={20} className="text-orange-500" />


      </button>

      {/* Dropdown Start */}
      {dropdownOpen && (
        <div className="shadow-theme-lg  absolute  -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl shadow-lg my-background  p-3 sm:w-[361px] lg:right-0 bg-notifi">
          <div className="mb-3 flex items-center justify-between border-b border-base-100 pb-3 ">
            <h5 className="text-md font-semibold text-base-content ml-4">
              Notification
            </h5>
            <button
              onClick={() => setDropdownOpen(false)}
              className="text-gray-500 dark:text-gray-400"
            >
              <span
                className={`absolute top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-orange-400 ${notifying ? "flex" : "hidden"
                  }`}
              >
                <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
              </span>
              <svg
                className="fill-current"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                  fill=""
                />
              </svg>
            </button>
          </div>

          <ul className="custom-scrollbar flex h-full flex-col overflow-y-auto  !scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-base-100">
            {apiDataIn?.map((item) =>
              <li key={item?.id}>
                <a
                  className="flex gap-6 items-center cursor-pointer  border-b border-base-100 p-3 px-4.5 py-3 "
                  onClick={() => navigate(`/details/${item?.id}`)}
                >
                  <span className="relative z-1 block h-10 bg-base-100 shadow-md w-full max-w-10 rounded-full">
                    {item?.photo ? (<img
                      src={item?.photo}
                      alt="User"
                      className="overflow-hidden h-full w-full object-cover rounded-full"
                    />) : (<img
                      src="https://randomuser.me/api/portraits/men/3.jpg"
                      alt="User"
                      className="overflow-hidden h-full w-full object-cover rounded-full"
                    />)}
                  </span>
                  <span className="block">
                    <span className="text-theme-sm mb-1.5 block text-gray-500">
                      <span className="font-medium text-base-content">
                        {item?.full_name}
                      </span>{" "} <br />
                      <span className="font-medium text-base-content">
                        murojat sababi:{" "} {item?.type_disease?.name}
                      </span>
                    </span>
                    <span className="text-theme-xs flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <span className="flex gap-1 items-center text-orange-600"><Phone size={16} /> Telefon</span>
                      <span className="h-1 w-1 animate-ping rounded-full bg-orange-400"></span>
                      <span className="text-blue-500">{
                        item?.phone_number
                      }</span>
                    </span>
                  </span>
                </a>
              </li>
            )}
            {/* Add More Notifications Here */}
          </ul>

          <Link
            to="/notification"
            className="text-theme-sm  bottom-0  shadow-theme-xs mt-3 flex justify-center rounded-lg  bg-[orange] text-white p-3 font-medium  hover:bg-orange-400 "
          >
            To'liq ro'yxat
          </Link>
        </div>
      )}
      {/* Dropdown End */}
    </div>
  );
};

export default NotificationDropdown;
