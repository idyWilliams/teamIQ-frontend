
import React from "react";
import { useState } from "react";











const Password = () => {

  







  // a state that stores the password inputed info
  const [formData, setFormData] = useState<Record<FormKeys, string>>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  type FormKeys = "currentPassword" | "newPassword" | "confirmPassword";

  // this is the data rendered on the UI
  const fields: { id: FormKeys; label: string }[] = [
    { id: "currentPassword", label: "Current Password:" },
    { id: "newPassword", label: "New Password:" },
    { id: "confirmPassword", label: "Confirm New Password:" },
  ];


  // function to cancel 
    
  function cancelPassword(e: React.FormEvent) {
    e.preventDefault();
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }

  return (
    <div className="">
      <h2 className="font-semibold mt-5 mb-2 text-2xl max-sm:text-xl max-sm:mb-1">
        Password
      </h2>
      <p className="text-sm text-muted-foreground ">
        Please enter your password to update your password
      </p>
      <hr className="my-6"></hr>

      {/* rendering password form */}
      <form className="flex flex-col gap-y-6 sm:gap-y-22">
        {fields.map((f) => (
          <div
            key={f.id}
            className=" flex justify-start gap-x-1 items-center flex-wrap max-sm:gap-y-6   "
          >
            <label htmlFor={f.id} className="sm:w-45  text-[16px] max-sm:text-sm">{f.label }</label>
            <input
              type="password"
              placeholder="***********"
              value={formData[f.id]}
              id={f.id}
              onChange={(e) =>
                setFormData({ ...formData, [f.id]: e.target.value })
              }
              className="  w-full max-w-[576px] h-[56px] rounded-[8px] px-6 py-3 border-b-[1.5px] border-ring bg-muted"
            />
          </div>
        ))}
 {/* password buttons */}
        <div className="flex gap-4 max-sm:flex-col-reverse max-sm:gap-3">
         
          <button
            onClick={cancelPassword}
            className="py-4 text-iq  border-iq border-1 w-full max-w-[370px] rounded-[8px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-4 text-primary-foreground bg-iq border-1 w-full max-w-[370px] rounded-[8px]"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Password;
