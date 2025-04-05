import { motion } from "framer-motion";

const UserSection = ({ icon: Icon, title, children }) => {
  return (
    <motion.div
      className='bg-transparent  px-5  mb-5'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`flex items-center ${title == "Mijoz ma'lumotlari" ? "justify-start" : "justify-end"} mb-2`}>
        {Icon && <Icon className='text-indigo-400 mr-4' size='24' />}
        <h2 className='text-xl font-semibold text-base-content'>{title}</h2>
      </div>
      {children}
    </motion.div>
  );
};
export default UserSection;
