'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { X } from 'lucide-react';

// Validation schema using Yup
interface OnboardingSuccess {
  onClose?: () => void;
}

const OnboardingSuccess = ({ onClose }: OnboardingSuccess) => {



const completedOnboarding =() =>{
  
  const completed = document.getElementById("completed");
  const cont = document.getElementById("continue");
  
  if (cont) {
    cont.addEventListener("click", () => {
      onClose?.();
      if (completed) {
        completed.style.display = "none";
        console.log("Onboarding completed");
      }
    });
  }
};

 
  return (
    <div className="mx-auto w-[576px] p-10 flex flex-col justify-center items-center">
      <div > <Avatar>
            <AvatarImage src="/images/Rectangle 34.png" alt="danger-icon" />
            <AvatarFallback>D</AvatarFallback>
          </Avatar></div>
       
      <h2 className="mb-4 pt-5 text-center text-2xl font-semibold max-sm:text-xl">
        Hooray!!!
      </h2>
      <p className="mb-12 text-center text-xl">
       Your organization details have been completed
      </p>

      <Button
        variant="ghost"
        onClick={onClose}
        className="ring-offset-background focus:ring-ring absolute -top-1 -right-1 cursor-pointer rounded-sm opacity-70 transition-opacity"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
{/* close modal */}
      <div className="mt-10 block w-full">
        <Button
         onClick={() => {
           onClose;
           completedOnboarding();
         }}
          className="bg-iq-500   hover:bg-iq-500 h-auto w-full cursor-pointer rounded-md px-6 py-3 text-white hover:text-white md:px-4"
          type="submit"
          id='continue'
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default OnboardingSuccess;
