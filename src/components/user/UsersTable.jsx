import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";



const UsersTable = ({ apiData }) => {
  const navigate = useNavigate();

  console.log(apiData, "bu global context",);


  return (
    <div
      className='bg-base-100 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >


      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-700'>
          <thead>
            <tr>

              <th className='px-6 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider'>
                ID / Ism
              </th>

              <th className='px-6 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider'>
                Tasnifi
              </th> <th className='px-6 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider'>
                Telefon
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider'>
                Status
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-300'>
            {apiData?.map((user, i) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >

                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className="pr-3 text-base-content w-6">{i + 1}</div>
                    <div className='flex-shrink-0 h-10 w-10'>
                      {user?.photo ? (
                        <div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
                          <img className="w-full h-full rounded-full bg-gradient-to-r from-purple-400 to-blue-500 object-cover flex items-center justify-center text-white font-semibold" src={user?.photo} alt="" />
                        </div>
                      ) : (
                        <div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
                          {user?.full_name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-base-content cursor-pointer hover:text-blue-400'
                        onClick={() => navigate(`/details/${user?.id}`)} >
                        {user?.full_name}
                      </div>
                    </div>
                  </div>
                </td>

                {/* <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-300'>{user.region}</div>
                </td> */}
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className=' inline-flex text-xs leading-5 font-semibold rounded-full  text-base-content'>
                    {user.type_disease?.name}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className=' inline-flex text-xs leading-5 font-semibold rounded-full  text-base-content'>
                    {user?.phone_number}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`p-[2px] flex justify-center text-xs leading-5 font-semibold w-20 rounded-full ${user.status === "debtor"
                      ? "bg-red-500 text-green-100" : user.status === "treated" ? "bg-green-500 text-yellow-100"
                        : "bg-yellow-500 text-red-100"
                      }`}
                  >
                    {user.status == "debtor" ? "qarizdor" : user.status === "treated" ? "davolangan" : "to'langan"}
                  </span>
                </td>

                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  {/* <Link to={`/details`}> */}
                  <button className='text-indigo-400 cursor-pointer hover:text-indigo-300' onClick={() => navigate(`/details/${user?.id}`)}>info</button>
                  {/* </Link> */}

                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UsersTable;
