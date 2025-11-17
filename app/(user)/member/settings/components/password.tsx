import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff } from 'lucide-react';

type FormKeys = 'currentPassword' | 'newPassword' | 'confirmPassword';
type PasswordForm = Record<FormKeys, string>;

const Password = () => {
  const [showPassword, setShowPassword] = useState<Record<FormKeys, boolean>>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const submit = (data: PasswordForm) => {
    console.log(data); // data contains all password fields
  };

  const schema = yup.object().shape({
    currentPassword: yup.string().required('Password is required'),
    newPassword: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Passwords must match')
      .required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordForm>({ resolver: yupResolver(schema) });

  const fields: { id: FormKeys; label: string }[] = [
    { id: 'currentPassword', label: 'Current Password:' },
    { id: 'newPassword', label: 'New Password:' },
    { id: 'confirmPassword', label: 'Confirm New Password:' },
  ];

  function cancelPassword(e: React.FormEvent) {
    e.preventDefault();
    reset(); // clear all inputs
  }

  return (
    <div className="w-full">
      <h2 className="mb-2 text-2xl font-semibold max-sm:mb-1 max-sm:text-xl">
        Password
      </h2>
      <p className="text-muted-foreground text-sm">
        Please enter your password to update your password
      </p>
      <hr className="my-6" />

      <form
        className="flex flex-col gap-y-6 sm:gap-y-22"
        onSubmit={handleSubmit(submit)}
      >
        {fields.map(f => (
          <div
            key={f.id}
            className="flex w-full max-w-[576px] gap-2 max-sm:flex-col"
          >
            <label
              htmlFor={f.id}
              className="text-[16px] max-sm:text-sm sm:w-65"
            >
              {f.label}
            </label>

            <div className="relative w-full">
              <input
                type={showPassword[f.id] ? 'text' : 'password'}
                id={f.id}
                placeholder="***********"
                className={`border-ring bg-muted h-[56px] w-full rounded-[8px] border-b-[1.5px] px-6 py-3 pr-10 ${
                  errors[f.id] ? 'border-red-500' : ''
                }`}
                {...register(f.id)}
              />
              <button
                type="button"
                className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 focus:outline-none"
                onClick={() =>
                  setShowPassword(prev => ({
                    ...prev,
                    [f.id]: !prev[f.id],
                  }))
                }
              >
                {showPassword[f.id] ? (
                  <Eye
                    size={20}
                    className="text-muted-foreground sm:h-4 sm:w-4 md:h-5 md:w-5"
                  />
                ) : (
                  <EyeOff
                    size={20}
                    className="text-muted-foreground sm:h-4 sm:w-4 md:h-5 md:w-5"
                  />
                )}
              </button>
              {/* ✅ Error for each specific field */}
            </div>
            {errors[f.id] && (
              <p className="mt-1 text-sm text-red-500">
                {errors[f.id]?.message?.toString()}
              </p>
            )}
          </div>
        ))}

        <div className="flex gap-4 max-sm:flex-col-reverse max-sm:gap-3">
          <button
            onClick={cancelPassword}
            className="text-iq border-iq w-full rounded-[8px] border-1 py-4 sm:max-w-[280px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-primary-foreground bg-iq w-full rounded-[8px] border-1 py-4 sm:max-w-[280px]"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Password;
