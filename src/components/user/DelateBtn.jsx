import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

const DeleteBtn = ({ userId }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {

    const authToken = localStorage.getItem("authToken"); // Tokenni localStorage-dan olish

    if (!authToken) {
      toast.error("Auth token topilmadi. Iltimos, qayta tizimga kiring.");
      return;
    }

    toast.promise(
      new Promise((resolve, reject) => {
        if (window.confirm("Haqiqatan ham ushbu foydalanuvchini o'chirishni xohlaysizmi?")) {
          fetch(`https://dilshodakosmetolog.uz/monitoring/patients/${userId}/delete/`, {
            method: "DELETE",
            headers: {
              "accept": "application/json",
              "Authorization": `Bearer ${authToken}`, // Auth tokenni yuborish
            },
          })
            .then((response) => {
              if (response.ok) {
                resolve("Foydalanuvchi o'chirildi!");
                navigate("/");
              } else {
                reject("Xatolik yuz berdi! Foydalanuvchi o'chirilmadi.");
              }
            })
            .catch((error) => reject("Serverga ulanishda muammo!"));
        } else {
          reject("Foydalanuvchini o'chirish bekor qilindi!");
        }
      }),
      {
        loading: "O'chirilmoqda...",
        success: "Foydalanuvchi muvaffaqiyatli o'chirildi!",
        error: (msg) => msg,
      }
    );
  };

  return (
    <>

      <button className="btn-ghost bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded
      transition duration-200" onClick={handleDelete}>
        <Trash2 className='text-white' size={24} />
      </button>
    </>
  );
};

export default DeleteBtn;
