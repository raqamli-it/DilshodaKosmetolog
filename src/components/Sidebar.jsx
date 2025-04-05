import { Menu, UserRound, UserPlus, UserMinus, UserCheck, Users } from "lucide-react";
import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const SIDEBAR_ITEMS = [
  { name: "Mijozlar", icon: Users, color: "#EC4899", href: "/" },
  { name: "Mijoz qo'shish", icon: UserPlus, color: "#1717e8", href: "/created_users" },
  { name: "Fa'ol mijozlar", icon: UserCheck, color: "#F59E0B", href: "/active_users" },
  { name: "Qarizdor mijozlar", icon: UserMinus, color: "#EF4444", href: "/debtor_users" },
  { name: "Sog'aygan mijozlar", icon: UserRound, color: "#10B981", href: "/recovered_patients" },
];

const Sidebar = () => {
  const { themeSd } = useContext(GlobalContext)

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-20"
        }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className='h-full bg-base-100 p-4 flex flex-col '>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className='p-2 rounded-full hover:bg-base-300 transition-colors max-w-fit'
        >
          <Menu size={24} className="text-base-content" />
        </motion.button>

        <nav className='mt-8 flex-grow'>
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div className='flex group items-center p-4 text-sm font-medium rounded-lg   transition-colors mb-2'
                style={{ backgroundColor: themeSd == item.name ? "orange" : "transparent" }}
              >
                <item.icon size={20} style={{ color: themeSd == item.name ? "white" : item.color, minWidth: "20px" }} />

                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className='ml-4 whitespace-nowrap text-base-content'
                      style={{ color: themeSd == item.name ? "white" : "" }}
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};
export default Sidebar;
