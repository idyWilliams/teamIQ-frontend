import React from 'react';
import { X } from 'lucide-react';

type ModalProps = {
  onClose: () => void;
};
const RightSidebarModal = ({ onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 xl:hidden">
      <div className="relative w-11/12 max-w-sm rounded-lg bg-white p-4 shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="font-bold text-[#232323]">Notifications</h2>
        <p className="mt-2 text-sm text-gray-600">
          Your notifications will appear here.
        </p>
      </div>
    </div>
  );
};

export default RightSidebarModal;
