import { motion } from "framer-motion";
import { ArrowDownRightSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";


const UserNotifeTable = ({ apiData }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className='bg-base-100 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >


      <div className='overflow-x-auto'>
        <table className='min-w-full '>
          <thead className="border-b border-gray-400">
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                ID / Ism
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Tasnifi
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Telefon
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Ma'lumot
              </th>

            </tr>
          </thead>

          <tbody className=''>
            {apiData?.map((item, i) => (
              <motion.tr
                key={item?.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className="pr-3 text-base-content w-6">{i + 1}</div>
                    <div className='flex-shrink-0 h-10 w-10'>
                      {item?.photo ? (
                        <div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
                          <img className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold" src={item?.photo} alt="" />
                        </div>
                      ) : (
                        <div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
                          {item?.full_name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm hover:text-indigo-400 cursor-pointer font-medium text-base-content'
                        onClick={() => navigate(`/details/${item?.id}`)}
                      >{item?.full_name}</div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-base-content'>
                  {item?.type_disease?.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-base-content'>
                  {item?.phone_number}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item?.status === "active"
                      ? "bg-orange-400 text-white"
                      : item?.status === "debtor"
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"

                      }`}
                  >
                    {item?.status == "debtor" ? "qarizdor" : item?.status === "treated" ? "davolangan" : "to'langan"}

                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <button className='text-indigo-400 hover:text-indigo-300 mr-2' onClick={() => navigate(`/details/${item?.id}`)}>
                    <ArrowDownRightSquare size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
export default UserNotifeTable;
