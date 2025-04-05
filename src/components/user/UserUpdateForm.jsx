

import { CameraIcon, Trash2 } from "lucide-react";

import { useCallback, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { DataService } from "../../config/DataService";
import { endpoints } from "../../config/endpoinds";
import { useNavigate } from "react-router-dom";

const UserUpdateForm = ({ id }) => {
  const navigate = useNavigate();
  const [pato, setPato] = useState()
  const [apiData, setApiData] = useState([]);
  const [formData, setFormData] = useState({
    full_name: apiData?.full_name,
    phone_number: apiData?.phone_number,
    region: apiData?.region?.id,
    address: apiData?.address,
    type_disease: apiData?.type_disease?.id,
    face_condition: apiData?.face_condition,
    medications_taken: apiData?.medications_taken,
    home_care_items: apiData?.home_care_items,
    total_payment_due: apiData?.total_payment_due,
    photo: "",
    new_appointments: [{ appointment_time: "" }],
  });
  const fetchData = async () => {
    const response = await DataService.get(endpoints.patientByid(id));
    console.log(response, "havolalar user details update");
    setApiData(response);
    // console.log(response?.results);
    response?.appointments?.forEach((item) => {
      console.log(response?.appointments[0].appointment_time, "update");

    })
  };
  useEffect(() => {
    fetchData();
    setFormData({
      full_name: apiData?.full_name,
      phone_number: apiData?.phone_number,
      region: apiData?.region?.id,
      address: apiData?.address,
      type_disease: apiData?.type_disease?.id,
      face_condition: apiData?.face_condition,
      medications_taken: apiData?.medications_taken,
      home_care_items: apiData?.home_care_items,
      total_payment_due: apiData?.total_payment_due,
      photo: "",
      new_appointments: [{ appointment_time: "" }],
    })
    setBoolen({ ...boolens, region_name: apiData?.region?.name ? apiData?.region?.name : "Viloyat", type_name: apiData?.type_disease?.name ? apiData?.type_disease?.name : "Turi" });


  }, [id]);
  useEffect(() => {
    if (apiData) {
      setFormData({
        full_name: apiData.full_name || "",
        phone_number: apiData.phone_number || "",
        region: apiData.region?.id || "",
        address: apiData.address || "",
        type_disease: apiData.type_disease?.id || "",
        face_condition: apiData.face_condition || "",
        medications_taken: apiData.medications_taken || "",
        home_care_items: apiData.home_care_items || "",
        total_payment_due: apiData.total_payment_due || 0,
        photo: "",
        new_appointments: [{ appointment_time: "" }],

      });
      setBoolen({ ...boolens, region_name: apiData?.region?.name ? apiData?.region?.name : "Viloyat", type_name: apiData?.type_disease?.name ? apiData?.type_disease?.name : "Turi" });

    }
  }, [apiData]);








  const [boolens, setBoolen] = useState({ region: false, type: false, region_name: "Viloyat", type_name: "Turi" });

  const [images, setImages] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPato(file)
    if (file) {
      console.log("Tanlangan fayl:", file); // Fayl obyektini log qilish
      console.log("Fayl turi:", file.type);
      console.log("Fayl nomi:", file.name);

      setFormData((prev) => ({ ...prev, photo: file }));
    } else {
      // setFormData((prev) => ({ ...prev, photo: apiData?.photo }));
    }
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImages(file)

  //     const reader = new FileReader();

  //     // Faylni o'qish jarayonida nimani qilish kerakligini aniqlash
  //     reader.onload = () => {
  //       const base64String = reader.result.split(",")[1]; // Base64 stringni olish
  //       console.log("Base64 format:", base64String);

  //       // Base64ni formData ga qo'shish
  //       setFormData((prev) => ({ ...prev, photo: base64String }));
  //     };

  //     // Faylni o'qish jarayonini boshlash
  //     reader.readAsDataURL(file);
  //   } else {
  //     console.error("Fayl tanlanmagan!");
  //   }
  // };
  const handleAppointmentChange = (index, value) => {
    const updatedAppointments = [...formData.new_appointments];
    updatedAppointments[index].appointment_time = value;
    setFormData((prev) => ({ ...prev, new_appointments: updatedAppointments }));
  };

  const addAppointment = () => {
    setFormData((prev) => ({
      ...prev,
      new_appointments: [...prev.new_appointments, { appointment_time: "" }],
    }));
  };

  const removeAppointment = (index) => {
    const updatedAppointments = formData.new_appointments.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, new_appointments: updatedAppointments }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Token topilmadi. Iltimos, tizimga kiring!");
      return;
    }

    // FormData yaratish


    try {
      const response = await fetch(
        `https://dilshodakosmetolog.uz/monitoring/patients/update/${id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, // Tokenni qo‘shish
            'Content-Type': 'application/json',

          },
          body: JSON.stringify(formData), // FormData formatida yuboriladi
        }
      );

      if (!response.ok) {
        toast.error("Yuborishda xatolik yuz berdi");
        throw new Error("Yuborishda xatolik yuz berdi");
      }

      const result = await response.json();
      toast.success("Ma'lumot muvaffaqiyatli yuborildi!");
      // navigate(`/details/${id}`)

    } catch (error) {
      toast.error("Yuborishda xatolik yuz berdi");
    }
  };
  //////////////////////////////////////////

  const [apiDataIn, setApiDataIn] = useState([]);
  const fetchDataIn = async () => {
    const response = await DataService.get(endpoints.region);
    setApiDataIn(response);

  };
  useEffect(() => {
    setFormData({
      full_name: apiData?.full_name,
      phone_number: apiData?.phone_number,
      region: apiData?.region?.id,
      address: apiData?.address,
      type_disease: apiData?.type_disease?.id,
      face_condition: apiData?.face_condition,
      medications_taken: apiData?.medications_taken,
      home_care_items: apiData?.home_care_items,
      total_payment_due: apiData?.total_payment_due,
      photo: "",
      new_appointments: [{ appointment_time: "" }],

    })
    // setFormData({ ...formData, region: apiData?.region?.id ? apiData?.region?.id : "", type_disease: apiData?.type_disease?.id ? apiData?.type_disease?.id : "" })
    setBoolen({ ...boolens, region_name: apiData?.region?.name ? apiData?.region?.name : "Viloyat", type_name: apiData?.type_disease?.name ? apiData?.type_disease?.name : "Turi" });
    fetchDataIn();


  }, [id]);



  const [apiDataDs, setApiDataDs] = useState([]);
  const fetchDataDs = async () => {
    const response = await DataService.get(endpoints.diseases);
    setApiDataDs(response);
    // console.log(response?.results);

  };
  useEffect(() => {
    fetchDataDs();


  }, []);
  ///////////
  const formatDateTime = (date) => {
    if (date) {
      return new Date(date).toISOString().slice(0, 16);

    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 mx-auto  space-y-4 border rounded-lg shadow">
      <div className="lg:p-7 lg:pb-3">

        <div className="flex gap-5"> {/* bu glavniy kichkina */}


          <div className=" w-full">

            <div className="flex justify-between ">

              <div className="mr-5 ">
                {/* Photo */}
                <div className="mt-6 w-28 h-28 border border-gray-400 rounded-md !bg-cover !bg-no-repeat relative bg-center flex justify-center items-center" style={{
                  backgroundImage: images ? `url(${URL.createObjectURL(images)})` : `url(${apiData?.photo})`,
                }}
                >
                  <CameraIcon className="w-8 h-8 text-base-content" />

                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    onChange={handleFileChange}
                    className="file-input text-base-content bg-transparent file-input-bordered w-full absolute z-10 h-full opacity-0"
                  />




                </div>
                {/* <label htmlFor="photo" className="label px-1  w-full flex justify-center text-base-content font-medium">
                  Photo
                </label> */}
              </div>{/*fotka*/}

              <div className="w-full">
                <div className="">
                  <label htmlFor="full_name" className="label px-1 text-base-content font-medium">
                    Ism Familya
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="input text-base-content input-bordered w-full"
                    placeholder="Ism Familya"
                    required
                  />
                </div>
                {/* Phone Number */}
                <div className="mt-3">
                  <label htmlFor="phone_number" className="label px-1 text-base-content font-medium">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="input text-base-content input-bordered w-full"
                    placeholder="+998901234567"
                    required
                  />
                </div>
              </div>
              <Toaster position="top-right" />

            </div>





            <div className="flex gap-4 justify-end mt-3">
              <div className="relative inline-block text-left w-full">
                <label className="text-base-content">
                  Viloyat
                </label>
                <button type="button" className="inline-flex cursor-pointer bg-base-100  justify-start px-4 w-full rounded-md border border-gray-600 shadow-sm  py-[10px] text-sm font-medium text-base-content hover:bg-base-300 focus:outline-none"

                  onClick={() => setBoolen({ ...boolens, region: !boolens.region })}
                >
                  {boolens.region_name}
                </button>

                {boolens.region && <div className="absolute z-50 right-0 mt-2 w-56 rounded-md shadow-lg bg-base-100  border border-gray-600">
                  <div className="py-1 min-h-30">
                    {apiDataIn?.map((item, index) => (
                      <a
                        key={index}
                        className="block px-4 py-2  text-sm text-base-content hover:bg-base-300"
                        // onClick={() => { setFormData({ ...formData, region: item?.id }); setBoolen({ ...boolens, region_name: item?.name }) }}
                        onClick={() => { setBoolen({ ...boolens, region: false, region_name: item?.name }); setFormData({ ...formData, region: item?.id }) }}

                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>}
              </div>
              <div className="relative inline-block !text-left w-full">
                <label className="text-base-content">
                  Kasallik
                </label>
                <button type="button" className="inline-flex cursor-pointer  bg-base-100 justify-start px-2 h-[41px] w-full rounded-md border border-gray-600 shadow-sm  py-[10px] text-sm font-medium text-base-content hover:bg-base-300 focus:outline-none"
                  onClick={() => setBoolen({ ...boolens, type: !boolens.type })}
                >
                  {boolens.type_name}
                </button>

                {boolens.type && <div className="absolute z-50 right-0 mt-2 w-56 rounded-md shadow-lg bg-base-100  border border-gray-600">
                  <div className="py-1 min-h-30">
                    {apiDataDs?.map((item, index) => (
                      <a
                        key={item?.id}
                        href="#"
                        className="block px-4 py-2 text-sm text-base-content hover:bg-base-300"
                        // onClick={() => { setBoolen({ ...boolens, type: !boolens.type }); setFormData({ ...formData, type_disease: item?.id }); setBoolen({ ...boolens, type_name: item?.name }) }}
                        onClick={() => { setBoolen({ ...boolens, type: false, type_name: item?.name }); setFormData({ ...formData, type_disease: item?.id }) }}

                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>}
              </div>
            </div>

            {/* Face Condition */}
            <div className="mt-3">
              <label htmlFor="face_condition" className="label px-1 text-base-content font-medium">
                Yuz Holati
              </label>
              <textarea
                id="face_condition"
                name="face_condition"
                value={formData.face_condition}
                onChange={handleChange}
                className="textarea text-base-content textarea-bordered w-full"
                placeholder="Tarif"
                required
              ></textarea>
            </div>

            {/* Medications Taken */}
            <div className="mt-3">
              <label htmlFor="medications_taken" className="label px-1 text-base-content font-medium">
                Qo'lanilgan dorilar
              </label>
              <textarea
                id="medications_taken"
                name="medications_taken"
                value={formData.medications_taken}
                onChange={handleChange}
                className="textarea text-base-content textarea-bordered w-full"
                placeholder="Dori darmonlar ro'yhati"
                required
              ></textarea>
            </div>

          </div>

          <div className="w-full">


            {/* Address */}
            <div className="">
              <label htmlFor="address" className="label px-1 text-base-content font-medium">
                Manzil
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input text-base-content input-bordered w-full"
                placeholder="Yashash manzili"
                required
              />
            </div>
            {/* Total Payment Due */}
            <div className="mt-3">
              <label htmlFor="total_payment_due" className="label px-1 text-base-content font-medium">
                To'lov Summasi
              </label>
              <input
                type="number"
                id="total_payment_due"
                name="total_payment_due"
                value={formData.total_payment_due}
                onChange={handleChange}
                className="input text-base-content input-bordered w-full"
                placeholder="e.g., 150000.00"
                required
              />
            </div>
            {/* Home Care Items */}
            <div className="mt-3">
              <label htmlFor="home_care_items" className="label px-1 text-base-content font-medium">
                Uy uchun mualaja
              </label>
              <textarea
                id="home_care_items"
                name="home_care_items"
                value={formData.home_care_items}
                onChange={handleChange}
                className="textarea text-base-content textarea-bordered w-full"
                placeholder=""
                required
              ></textarea>
            </div>
            <label className="label px-1 text-base-content font-medium mt-3">Ko'rik Vaqti</label>
            {formData.new_appointments.map((appointment, index) => (
              <div key={index} className="flex items-center gap-2 mb-2 ">
                <input
                  type="datetime-local"
                  value={formData?.new_appointments[index]?.appointment_time}
                  onChange={(e) => handleAppointmentChange(index, e.target.value)}
                  className="input text-base-content input-bordered flex-1"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeAppointment(index)}
                  className="btn bg-[crimson]"
                >
                  <Trash2 size={20} className="text-white" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addAppointment}
              className="btn bg-green-500 text-white btn-sm"
            >
              Sana qo'shish
            </button>
          </div>

        </div>

        {/* Submit Button */}
        <button type="submit" className="btn my-7 py-5 bg-[orange] text-white w-full"

        >
          Saqlash
        </button>
      </div>
    </form >
  );
};

export default UserUpdateForm;
