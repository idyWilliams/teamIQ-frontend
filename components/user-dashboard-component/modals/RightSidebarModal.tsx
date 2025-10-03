import React from "react";
import { X } from "lucide-react";

type ModalProps = {
  onClose: () => void;
};
const RightSidebarModal = ({ onClose }: ModalProps) => {
  return (
    <div className="fixed md:hidden inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-sm rounded-lg shadow-lg p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-[#232323] font-bold">Notifications</h2>
        <p className="text-sm text-gray-600 mt-2">
          Your notifications will appear here.
        </p>
      </div>
    </div>
  );
};

export default RightSidebarModal;
