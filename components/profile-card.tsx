import React from 'react'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from './ui/button'

type AvatarType = {
  src?: string;
  alt?: string;
  fallback?: string;
  name?: string;
  email?: string;
};

type ProfileCardProps = {
  avatar: AvatarType;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ avatar }) => {
  return (
    <div className="w-full max-w-[400px] h-40 rounded-lg overflow-hidden shadow-md flex flex-col">

      <div className="relative flex flex-row items-center gap-2 p-4 bg-[#086ACE] flex-1">
        <Avatar className="absolute top-13 w-12 h-12">
          <AvatarImage
            src={avatar?.src}
            alt={avatar?.alt || avatar?.fallback}
          />
        </Avatar>
        <div className="flex flex-col text-white pl-20">
          <p className="font-semibold">{avatar?.name}</p>
          <p className="text-sm opacity-80">{avatar?.email}</p>
        </div>
      </div>


      <div className="flex items-left justify-start pt-6 pl-4 flex-1 bg-white">
        <Button variant="outline" className='text-[#086ACE] border-[#086ACE]'>Remove</Button>
      </div>
    </div>
  )
}

export default ProfileCard
