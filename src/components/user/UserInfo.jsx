import UserSection from "./UserSection";
import { useState } from "react";

const UserInfo = ({ apiData, title }) => {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <UserSection title={title} >

      <div className='mt-2 text-base-content shadow min-h-56 p-6 rounded-md bg-base-100'>
        <p className="custom-capitalized text-base md:text-lg lg:text-[15px] font-medium text-base-content leading-relaxed break-words max-w-full">
          {apiData}
        </p>

      </div>
    </UserSection>
  );
};
export default UserInfo;
