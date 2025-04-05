import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";


const PaymentForm = ({ id }) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const authToken = localStorage.getItem("authToken"); // Tokenni o'qish
      if (!authToken) {
        throw new Error("Auth token topilmadi! LocalStorage'da `authToken` saqlanganligini tekshiring.");
      }

      const response = await fetch(`https://dilshodakosmetolog.uz/monitoring/patients/${id}/payments/`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`, // Token headerga qo'shiladi
          'X-CSRFTOKEN': 'Zfg6cyovavUu4gItI6E3Jw5xjH3mRUYT1tWvNAh2OtJ7KmMqHVhpWLwpjQ2XODBH', // CSRF token
        },
        body: JSON.stringify({ amount }), // Kiritilgan summa yuboriladi
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
        toast.error(response.status);

      }

      const result = await response.json();
      setResponseMessage("To'lov muvaffaqiyatli amalga oshirildi!");
      toast.success("To'lov muvaffaqiyatli amalga oshirildi!");
      setAmount("");

      setTimeout(() => {
        location.reload();

      }, 3000);

    } catch (error) {
      setResponseMessage("Xatolik yuz berdi. Qayta urinib ko'ring.");
      toast.error("Xatolik yuz berdi. Qayta urinib ko'ring.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Summani kiriting"
        className="border border-base-300 rounded w-full p-2 mb-2 bg-base-300 text-base-content"
      />
      <button
        onClick={() => handlePayment()}
        disabled={isLoading || !amount} // Yuzlanayotgan holatda yoki summa kiritilmagan bo'lsa tugma faolsiz
        className="px-4 w-25 flex justify-center py-2 bg-[orange] text-white rounded hover:bg-orange-500"
      >
        {isLoading ? (<div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>) : "To'lash"}
      </button>

    </div>
  );
};

export default PaymentForm;