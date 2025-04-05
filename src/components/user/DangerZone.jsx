import { motion } from "framer-motion";
import { Trash2, TriangleAlert } from "lucide-react";
import DeleteBtn from "./DelateBtn";

const DangerZone = ({ apiData }) => {
  return (
    <motion.div
      className='bg-red-900 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-red-700 mb-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className='flex items-center mb-4'>
        <TriangleAlert className='text-white mr-3' size={24} />
        {/* <Trash2 className='text-white mr-3' size={24} /> */}
        <h2 className='text-lg font-semibold text-gray-100'>Xavfli hudud</h2>
      </div>
      <p className='text-gray-300 mb-4'>
        Mijoz ning barcha malumotlari o'chiriladi !.</p>

      <DeleteBtn userId={apiData?.id} />
    </motion.div>
  );
};
export default DangerZone;
