import { motion } from "framer-motion";
import Header from "../components/Header";
import Bredcamp from "../components/Bredcamp";
import UserForm from "../components/user/UserForm";
import { useEffect } from "react";



const CreatedUser = () => {
  useEffect(() => {
    sessionStorage.clear();

  }, [])
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title='Sales Dashboard' />


      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <Bredcamp title={"Mijoz qo'shish"} />
        <motion.div
          className=' mb-8 bg-base-100'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <UserForm />
        </motion.div>
      </main>
    </div>
  );
};
export default CreatedUser;
