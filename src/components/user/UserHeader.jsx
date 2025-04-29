import { User, MapPin, Phone, MapPinHouse, Activity, Stethoscope, CalendarFold, SquarePen, User2, Calendar, Trash2,FileText } from "lucide-react";
import UserSection from "./UserSection";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DangerZone from "./DangerZone";
import PaymentForm from "../PaymentForm";

import { toast } from "sonner";

const UserHeader = ({ apiData, onClicks }) => {
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
        onClicks(); // To'lov amalga oshirilgandan so'ng ma'lumotlarni yangilash
        // setTimeout(() => {
        //   location.reload()
        // }, 3000);
      }
    } catch (error) {
      toast.error("Error updating status:", error);
    } finally {
      setIsLoading(false);
    }
  };




  function formatNumberWithoutCommas(number) {
    return Number(number).toLocaleString('en-US').replace(/,/g, ' ');
  }

  // Misollar:
  const handleDelete = async (payment_id) => {

    const authToken = localStorage.getItem("authToken"); // Tokenni localStorage-dan olish



    toast.promise(
      new Promise((resolve, reject) => {
        if (window.confirm("Haqiqatan ham to'langan summani o'chirishni xohlaysizmi?")) {
          fetch(`https://dilshodakosmetolog.uz/monitoring/patients/${payment_id}/payments/${apiData?.id}/`, {
            method: "DELETE",
            headers: {
              "accept": "application/json",
              "Authorization": `Bearer ${authToken}`, // Auth tokenni yuborish
            },
          })
            .then((response) => {
              if (response.ok) {
                resolve("Foydalanuvchi o'chirildi!");
                onClicks();
              } else {
                reject("Xatolik yuz berdi! Foydalanuvchi o'chirilmadi.");
                resolve("Xatolik yuz berdi! Foydalanuvchi o'chirilmadi.");
              }
            })
            .catch((error) => reject(error.message));

        } else {
          reject("Foydalanuvchini o'chirish bekor qilindi!");
        }
      }),
      {
        loading: "O'chirilmoqda...",
        success: "Foydalanuvchi muvaffaqiyatli o'chirildi!",
        error: () => "Xatolik yuz berdi!",
      }
    );
  };

  // const generatePDF = () => {
  //   if (!apiData) return;

  //   const doc = new jsPDF();

  //   const data = {
  //     "F.I.Sh.": apiData.full_name,
  //     "Telefon raqami": apiData.phone_number,
  //     "Manzil": apiData.address,
  //     "Yuz holati": apiData.face_condition,
  //     "Uyda parvarish": apiData.home_care_items,
  //     "Dori vositalari": apiData.medications_taken,
  //     "To'lov holati": apiData.status,
  //     "To'lov summasi": apiData.total_payment_due,
  //     "To'langan": apiData.total_paid,
  //     "Qolgan qarz": apiData.remaining_debt,
  //     "Hudud": apiData.region?.name,
  //     "Kasallik turi": apiData.type_disease?.name,
  //     "Yaratilgan vaqt":  formatDate(apiData.created_at),
  //   };

  //   let y = 10;
  //   for (const key in data) {
  //     if (data.hasOwnProperty(key)) {
  //       doc.text(`${key}: ${data[key]}`, 10, y);
  //       y += 10;
  //     }
  //   }

  //   doc.save(`${data["F.I.Sh."]}ning bemorlik-malumotlari.pdf`);
  // };
  const generatePDF = () => {
    if (!apiData) return;

    const doc = new jsPDF();

    // PDF sarlavha
    doc.text("Bemor Ma'lumotlari", 14, 15);

    // Jadval uchun ustun va qiymatlarni juft qilib tayyorlash
    const rows = [
      ["F.I.Sh.", apiData.full_name],
      ["Telefon raqami", apiData.phone_number],
      ["Manzil", apiData.address],
      ["Yuz holati", apiData.face_condition],
      ["Uyda parvarish", apiData.home_care_items],
      ["Dori vositalari", apiData.medications_taken],
      ["To'lov holati", apiData.status],
      ["To'lov summasi", `${apiData.total_payment_due} so'm`],
      ["To'langan", `${apiData.total_paid} so'm`],
      ["Qolgan qarz", `${apiData.remaining_debt} so'm`],
      ["Hudud", apiData.region?.name],
      ["Kasallik turi", apiData.type_disease?.name],
      ["Yaratilgan vaqt", formatDate(apiData.created_at)],
    ];

    // Jadvalni chizish
    autoTable(doc, {
      startY: 20,
      head: [["Nomi", "Qiymat"]],
      body: rows,
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 40 },   // sarlavhalar
        
      },
    });

    doc.save(`${apiData?.full_name}ning bemorlik varaqasi.pdf`);
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
                {apiData?.status == "debtor" ? "Qarzdor" : apiData?.status == "treated" ? "Sog'aygan" : "Fa'ol"}

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
                  <li key={item?.id} className="text-base-content flex items-start justify-between px-2 gap-2 text-right"><span className="flex font-bold items-center gap-2"><Calendar size={16} /> Tashrif vaqti:</span> {formatDate(item?.appointment_time)}</li>

                )}
              </ul>
            </div>

          </div>}
          <div>
            <h2 className="text-base-content font-semibold text-lg">To'lovlar</h2>
            <div
              className="flex flex-col gap-5 border border-base-300 bg-base-100 w-[400px] shadow-xl p-7 rounded-md text-base-content">

              <ul>
                <li className="text-base-content flex items-center justify-between font-bold  gap-2"><span className="flex items-center gap-2 font-extrabold"> Umumiy miqdor:</span> {formatNumberWithoutCommas(apiData?.total_payment_due)} so'm</li>
                <li className="text-base-content flex items-center justify-between  gap-2"><span className="flex items-center gap-2 font-bold"> To'langan qism:</span> {formatNumberWithoutCommas(apiData?.total_paid)} so'm</li>
                <li className={`${apiData?.remaining_debt < 0 ? "text-red-500" : "text-base-content"} text-base-content flex items-center justify-between  gap-2`}><span className="flex items-center gap-2 font-bold"> To'lanmagan qism:</span> {formatNumberWithoutCommas(apiData?.remaining_debt)} so'm</li>
                <li className="mt-3">
                  {apiData?.payments?.length > 0 && <h2 className="text-base-content font-semibold text-lg">To'lovlar tarixi</h2>}
                  {

                    apiData?.payments?.map((item) =>
                      <li className={`text-base-content flex items-center justify-between  gap-2`}><span className="flex items-center  gap-2">{formatNumberWithoutCommas(item?.amount)} so'm</span>  <span className="cursor-pointer text-red-600 rounded
      transition duration-200" onClick={() => { handleDelete(item?.id) }}>
                        <Trash2 className='text-red-500' size={18} />
                      </span> </li>

                    )
                  }</li>

              </ul>
              <PaymentForm id={apiData?.id} onClicks={onClicks} />
              

            </div>
          </div>
\

          <div>
            <h2 className="text-base-content font-semibold text-lg">Yangilanishlar</h2>
            <div className="flex  gap-5 border border-base-300 bg-base-100 w-[400px] shadow-xl p-7 rounded-md text-base-content">

              <button
                onClick={() => fetchData(apiData?.id)} // Yangilanishlar tugmasi bosilganda fetchData funksiyasini chaqirish
                disabled={isLoading || apiData?.status == "treated"}
                className={`px-4 py-2 bg-green-500 cursor-pointer flex justify-center w-full h-12 text-white rounded hover:bg-green-600 ${apiData?.status == "treated" ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isLoading ? (<div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>) : "Davolangan"}
              </button>
              <button className="cursor-pointer px-4 py-2 w-full h-12 bg-indigo-500 flex justify-center items-center text-white rounded hover:bg-indigo-600"
                onClick={() => navigate(`/update_user/${apiData?.id}`)}
              >  <SquarePen size={20} /></button>
            </div>
          </div>
          <div>
            <h2 className="text-base-content font-semibold text-lg">Bemorning  malumotlarni olish</h2>
            <div className="flex  gap-5 border border-base-300 bg-base-100 w-[400px] shadow-xl p-7 rounded-md text-base-content">

              
              <button className="cursor-pointer px-4 py-2 w-full h-12 bg-indigo-500 flex justify-center items-center text-white rounded hover:bg-indigo-600"
               onClick={generatePDF}
              >  <FileText size={20} className="mx-3"/>  PDF Yuklab olish</button>
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
