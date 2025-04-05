import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { endpoints } from '../config/endpoinds';
import { DataService } from '../config/DataService';
import UserNotifeTable from '../components/UserNorifeTable';
import Bredcamp from '../components/Bredcamp';
import { AnimatePresence, motion } from "framer-motion";
import { Search } from 'lucide-react';


export default function NotifiPage() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false); // Yuklanish holati

  const fetchData = async () => {
    const response = await DataService.get(endpoints.userCountNs);
    console.log(response, "Notifif list");
    setApiData(response);
    // console.log(response?.results);
    setLoading(false);

  };
  useEffect(() => {
    fetchData();


  }, []);
  return (

    <>
      <main className='flex-1 overflow-auto relative z-10'>
        <Header />
        <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          {/* USER TABLE */}
          <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-6 px-6">
              <Bredcamp title={"Bildirish nomalar"} />

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
            ) : apiData.length === 0 ? (
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
                <UserNotifeTable apiData={apiData} />

              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </>)
}
