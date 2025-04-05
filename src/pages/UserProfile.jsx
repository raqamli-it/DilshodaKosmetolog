import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DataService } from "../config/DataService";
import { endpoints } from "../config/endpoinds";
import Header from "../components/Header";
import UserInfo from "../components/user/UserInfo";
import DangerZone from "../components/user/DangerZone";
import UserHeader from "../components/user/UserHeader";

const UserProfile = () => {
  const route = useParams()

  const [apiData, setApiData] = useState([]);
  const fetchData = async () => {
    const response = await DataService.get(endpoints.patientByid(route?.id));
    console.log(response, "havolalar user details");
    setApiData(response);
    // console.log(response?.results);

  };
  useEffect(() => {
    fetchData();


  }, []);
  // //


  return (
    <div className='flex-1 overflow-auto relative z-10 '>
      <Header title='Settings' />
      <main className='flex mx-auto py-6 px-4 lg:px-8'>
        <UserHeader apiData={apiData} />
        <div className="w-full">
          <UserInfo apiData={apiData?.face_condition} title={"Yuz holati"} />
          <UserInfo apiData={apiData?.home_care_items} title={"Uy uchun muolaja"} />
          <UserInfo apiData={apiData?.medications_taken} title={"Qo'llanilgan preparatlar"} />
        </div>

        {/* <Notifications /> */}

        {/* <ConnectedAccounts /> */}

      </main>
    </div>
  );
};
export default UserProfile;
