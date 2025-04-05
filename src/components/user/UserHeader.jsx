import { User, MapPin, Phone, MapPinHouse, Activity, Stethoscope, CalendarFold, SquarePen, User2, Calendar } from "lucide-react";
import UserSection from "./UserSection";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DangerZone from "./DangerZone";
import PaymentForm from "../PaymentForm";
import { toast } from "sonner";

const UserHeader = ({ apiData }) => {
  const navigate = useNavigate()
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);

    // Sana qismlarini ajratib olish
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Oy har doim 2 xonali bo'ladi
    const day = String(dateObject.getDate()).padStart(2, "0");
    const hour = String(dateObject.getHours()).padStart(2, "0");
    const minute = String(dateObject.getMinutes()).padStart(2, "0");
    const second = String(dateObject.getSeconds()).padStart(2, "0");

    // Formatlangan vaqt
    return `${day}.${month}.${year} ${hour}:${minute}:${second}`;
  };
  // const route = useParams()

  const [apiDataIn, setApiDataIn] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (id) => {
    setIsLoading(true);
    try {
      const authToken = localStorage.getItem("authToken"); // Tokenni localStorage'dan o'qish
      if (!authToken) {
        throw new Error("Auth token topilmadi! LocalStorage'da `authToken` saqlanganligini tekshiring.");
      }

      const response = await fetch(`https://dilshodakosmetolog.uz/monitoring/patients/${id}/update-status/`, {
        method: 'PATCH',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`, // Tokenni headerga qo'shamiz
        },
        body: JSON.stringify({
          status: "new_status_value", // Yangilangan status qiymati
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
        toast.error("Error updating status:", response.status);
      }

      const result = await response.json();
      setApiDataIn(result);

      if (result?.message == "Bemor hali qarzdor.") {
        toast.error("Bemor hali qarzdor");
      } else {
        toast.success("Status muvaffaqiyatli yangilandi!");
        setTimeout(() => {
          location.reload()
        }, 3000);
      }
    } catch (error) {
      toast.error("Error updating status:", error);
    } finally {
      setIsLoading(false);
    }
  };







  return (
    <>
      {/* {isEditing ? ( */}
      <UserSection icon={User} title={"Mijoz ma'lumotlari"}>
        <div className='flex flex-col  gap-5 w-full'>
          <div className="flex items-center w-[400px] flex-col gap-5 border  border-base-300 shadow-xl bg-base-100 rounded-md p-5">
            {apiData?.photo ? (<img
              src={apiData?.photo}
              alt='Profile'
              className='rounded-4xl w-40 h-40 bg-cover'
            />) : (<User2 size={100} className="text-base-content border rounded-lg border-base-content" />)}
            <h3 className='text-lg  font-semibold text-base-content'>{apiData?.full_name}</h3>

            <div className=" w-full flex justify-center ">
              <div className={`text-white  rounded-3xl py-1 px-10 ${apiData?.status == "debtor" ? "bg-red-500" : apiData?.status == "treated" ? "bg-green-500" : "bg-yellow-500"}`}>
                {apiData?.status == "debtor" ? "Qarizdor" : apiData?.status == "treated" ? "Sog'aygan" : "Fa'ol"}

              </div>
            </div>
            <ul className="mt-5 flex flex-col w-full gap-2">

              <li className="text-base-content flex items-start justify-between px-2 gap-2 text-right"><span className="flex font-bold items-center gap-2"><Phone size={16} /> Telefon:</span> {apiData?.phone_number}</li>
              <li className="text-base-content flex items-start justify-between px-2 gap-2 text-right"><span className="flex font-bold items-center gap-2"><MapPin size={16} />Viloyat:</span> {apiData?.region?.name}</li>
              <li className="text-base-content flex items-start justify-between px-2 gap-2 text-right"><span className="flex font-bold items-center gap-2"><MapPinHouse size={16} />Manzil:</span>{apiData?.address}</li>
              <li className="text-base-content flex items-start justify-between px-2 gap-2 text-right"><span className="flex font-bold items-center gap-2"><Stethoscope size={16} /> Murojat turi:</span>{apiData?.type_disease?.name}</li>
              <li className="text-base-content flex items-start justify-between px-2 gap-2 text-right"><span className="flex font-bold items-center gap-2"><CalendarFold size={16} />  Sana:</span>{formatDate(apiData?.created_at)}</li>
            </ul>

          </div    >
          {apiData?.appointments?.length > 0 && <div>
            <h2 className="text-base-content font-semibold text-lg">Ko'rik vaqtlari</h2>

            <div
              className="flex flex-col gap-5 border border-base-300 bg-base-100 w-[400px] shadow-xl p-7 pt-2 rounded-md text-base-content"

            >
              <ul className="mt-5 flex flex-col w-full gap-2">
                {apiData?.appointments?.map((item) =>
                  <li key={item?.id} className="text-base-content flex items-start justify-between px-2 gap-2 text-right"><span className="flex font-bold items-center gap-2"><Calendar size={16} /> Tshrif vaqti:</span> {formatDate(item?.appointment_time)}</li>

                )}
              </ul>
            </div>

          </div>}
          <div>
            <h2 className="text-base-content font-semibold text-lg">To'lovlar</h2>
            <div
              className="flex flex-col gap-5 border border-base-300 bg-base-100 w-[400px] shadow-xl p-7 rounded-md text-base-content">

              <ul>
                <li className="text-base-content flex items-center justify-between  gap-2"><span className="flex items-center gap-2 font-bold"> Umumiy miqdor:</span> {apiData?.total_payment_due} so'm</li>
                <li className="text-base-content flex items-center justify-between  gap-2"><span className="flex items-center gap-2 font-bold"> To'langan qisim:</span> {apiData?.total_paid} so'm</li>
                <li className={`${apiData?.remaining_debt < 0 ? "text-red-500" : "text-base-content"} text-base-content flex items-center justify-between  gap-2`}><span className="flex items-center gap-2 font-bold"> To'lanmagan qisim:</span> {apiData?.remaining_debt} so'm</li>

              </ul>
              <PaymentForm id={apiData?.id} />

            </div>
          </div>


          <div>
            <h2 className="text-base-content font-semibold text-lg">Yangilanishlar</h2>
            <div className="flex  gap-5 border border-base-300 bg-base-100 w-[400px] shadow-xl p-7 rounded-md text-base-content">

              <button
                onClick={() => fetchData(apiData?.id)}
                disabled={isLoading || apiData?.status == "treated"}
                className={`px-4 py-2 bg-green-500 flex justify-center w-full h-12 text-white rounded hover:bg-green-600 ${apiData?.status == "treated" ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isLoading ? (<div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>) : "Davolangan"}
              </button>
              <button className="px-4 py-2 w-full h-12 bg-indigo-500 flex justify-center items-center text-white rounded hover:bg-indigo-600"
                onClick={() => navigate(`/update_user/${apiData?.id}`)}
              >  <SquarePen size={20} /></button>
            </div>
          </div>

          <div >
            {apiData?.is_superuser && < DangerZone apiData={apiData} />}
          </div>

        </div>
        {/* <div className="flex items-center justify-end mb-2">
          <button onClick={toggleEditMode} className=' mr-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto'>
            Tahrirlash
          </button></div> */}
      </UserSection>


    </>
  );
};
export default UserHeader;
