import React from "react";

const AiSummaryActions = () => {
  return (
    <div className="flex justify-between mt-[16px]">
      <p className="text-[13px]">Powered by AI</p>
      <div className="flex gap-[8px]">
        <span className="icon-[pepicons-pencil--arrows-spin] cursor-pointer"></span>
        <span className="icon-[typcn--thumbs-down] cursor-pointer"></span>
        <span className="icon-[typcn--thumbs-up] cursor-pointer"></span>
        <span className="icon-[solar--copy-linear] cursor-pointer"></span>
      </div>
    </div>
  );
};

export default AiSummaryActions;
