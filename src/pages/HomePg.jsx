import { UserCheck, UserPlus, UsersIcon, UserRound, UserMinus, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import Bredcamp from "../components/Bredcamp";
import { endpoints } from "../config/endpoinds";
import { DataService } from "../config/DataService";
import UsersTable from "../components/user/UsersTable";

const HomePage = () => {
  const [apiDataSt, setApiDataSt] = useState();
  const fetchDataSt = async () => {
    const response = await DataService.get(endpoints.statistic)
    console.log(response, "statistic");
    setApiDataSt(response);
    console.log(response?.results);

  };
  useEffect(() => {
    fetchDataSt();
  }, []);
  const [apiData, setApiData] = useState([]); // API dan kelgan data
  const [searchTerm, setSearchTerm] = useState(""); // Qidiruv so'rovi
  const [previousPageUrl, setPreviousPageUrl] = useState(null); // Qidiruv so'rovi
  const [currentPage, setCurrentPage] = useState(); // Qidiruv so'rovi
  const [totalCount, setTotalCount] = useState(null); // Qidiruv so'rovi
  const [nextPageUrl, setNextPageUrl] = useState(null); // Qidiruv so'rovi
  const [loading, setLoading] = useState(false); // Yuklanish holati
  const [searchCompleted, setSearchCompleted] = useState(false); // Qidiruv tugallanganligi haqida belgi

  // API'dan ma'lumotlarni olish
  // const fetchData = async (searchQuery = "") => {
  //   setLoading(true); // Loaderni ko'rsatish
  //   setSearchCompleted(false); // Qidiruv jarayoni boshlandi
  //   try {
  //     const endpoint = searchQuery
  //       ? `${endpoints.all}?search=${searchQuery}` // Qidiruv uchun API
  //       : endpoints.all; // Umumiy ma'lumot uchun API
  //     const response = await DataService.get(endpoint);
  //     setApiData(response?.results || []); // Natijalarni saqlash
  //     console.log(response, "all data");

  //     setSearchCompleted(true); // Qidiruv tugadi
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setTimeout(() => setLoading(false), 800); // Loader vaqtini cho'zish
  //   }
  // };
  const fetchData = async (searchQuery = "", page = 1) => {
    setLoading(true); // Yuklanish holati
    setSearchCompleted(false); // Qidiruv jarayoni boshlandi
    try {
      const endpoint = `${endpoints.all}?search=${searchQuery}&page=${page}`;
      const response = await DataService.get(endpoint);

      // API ma'lumotlarini saqlash
      setApiData(response?.results || []);
      setTotalCount(response?.count || 0); // Umumiy ma'lumotlar soni
      setNextPageUrl(response?.next || null); // Keyingi sahifa URL
      setPreviousPageUrl(response?.previous || null); // Oldingi sahifa URL
      setSearchCompleted(true); // Qidiruv tugallanganligini belgilash
      sessionStorage.setItem("currentPage", page);
      sessionStorage.setItem("searchTerm", searchQuery);
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i); // i-index bo'yicha kalitni olish

        // Faqat key "currentPageAc" va "searchTermAc" bo'lmasa o'chirish
        if (key !== "currentPage" && key !== "searchTerm") {
          sessionStorage.removeItem(key); // sessionStorage'dan kalitni o'chirish
          console.log(`${key} o'chirildi.`);
        } else {
          const value = sessionStorage.getItem(key); // Kalitning qiymatini olish
          console.log(`Saqlangan kalit nomi: ${key}, Qiymati: ${value}`);
        }
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Yuklanish jarayoni tugadi
    }
  };
  // Boshlang'ich ma'lumotlarni olish
  // useEffect(() => {
  //   fetchData();
  // }, []);
  useEffect(() => {
    const savedPage = Number(sessionStorage.getItem("currentPage")) || 1; // Sahifani o‘qish
    const savedSearchTerm = sessionStorage.getItem("searchTerm") || ""; // Qidiruv matnini o‘qish

    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i); // i-index bo'yicha kalitni olish

      // Faqat key "currentPageAc" va "searchTermAc" bo'lmasa o'chirish
      if (key !== "currentPage" && key !== "searchTerm") {
        sessionStorage.removeItem(key); // sessionStorage'dan kalitni o'chirish
        console.log(`${key} o'chirildi.`);
      } else {
        const value = sessionStorage.getItem(key); // Kalitning qiymatini olish
        console.log(`Saqlangan kalit nomi: ${key}, Qiymati: ${value}`);
      }
    }
    setCurrentPage(savedPage);
    setSearchTerm(savedSearchTerm);

    // API chaqiruv
    fetchData(savedSearchTerm, savedPage);
  }, []);



  const handleNextPage = () => {
    if (nextPageUrl) {
      const nextPage = currentPage + 1;
      sessionStorage.setItem("currentPage", nextPage); // Sahifani saqlash
      setCurrentPage(nextPage);
      fetchData(searchTerm, nextPage); // Hozirgi qidiruv bilan keyingi sahifa
    }
  };

  const handlePreviousPage = () => {
    if (previousPageUrl) {
      const prevPage = currentPage - 1;
      sessionStorage.setItem("currentPage", prevPage);
      setCurrentPage(prevPage);
      fetchData(searchTerm, prevPage); // Hozirgi qidiruv bilan oldingi sahifa
    }
  };
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value); // Qidiruv matnini yangilash
    setCurrentPage(1); // Qidiruvni 1-sahifadan boshlash
    sessionStorage.setItem("currentPage", 1); // sessionStorage'da saqlash
    sessionStorage.setItem("searchTerm", value);
    fetchData(value, 1); // Qidiruv bilan birinchi sahifa uchun API chaqiriladi

  };
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Products" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name='Jami mijozlar'
            icon={UsersIcon}
            value={apiDataSt?.total_patients}
            color='#6366F1'
            bgColor={"all"}
          />
          <StatCard name="Fa'ol mijozlar" icon={UserCheck} value={apiDataSt?.paid} color='#f67f05' bgColor={"active"} />
          <StatCard
            name="Qarizdor mijozlar"
            icon={UserMinus}
            value={apiDataSt?.debtor}
            color='#EF4444'
            bgColor={"debtor"}

          />
          <StatCard name="Sog'aygan mijozlar" icon={UserRound} value={apiDataSt?.treated} color='#10B981' bgColor={"recovered"} />
        </motion.div>
        {/* USER TABLE */}
        <motion.div
          className="p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6 px-6">
            <Bredcamp title={"Mijozlar"} />
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search users..."
                className="text-base-content bg-base-100 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>
          {/* Table */}
          {loading ? (
            <motion.div
              className="flex justify-center items-center h-[60vh]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          ) : apiData.length === 0 && searchCompleted ? (
            <motion.div
              className="flex justify-center items-center h-[60vh] text-gray-500 text-lg font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>Natija topilmadi</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <UsersTable apiData={apiData} />
              <div className="flex justify-between items-center mt-6 px-6">
                <button
                  className="btn btn-outline bg-orange-400 btn-sm"
                  disabled={!previousPageUrl} // Oldingi sahifa mavjudligini tekshirish
                  onClick={handlePreviousPage}
                >
                  Oldingi
                </button>
                <span className="text-base-content">
                  {currentPage} / {Math.ceil(totalCount / 10)} {/* Umumiy sahifalar */}
                </span>
                <button
                  className="btn btn-outline bg-orange-400 btn-sm"
                  disabled={!nextPageUrl} // Keyingi sahifa mavjudligini tekshirish
                  onClick={handleNextPage}
                >
                  Keyingi
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};
export default HomePage;
