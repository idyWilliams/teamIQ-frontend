import DocActionPopup from "./doc-action-popup";

type linkedDocProps = {
  data: string[];
};
const LinkedDocs = ({ data }: linkedDocProps) => {
  return (
    <div className="flex flex-col gap-[12px]">
      {data.map((doc, index) => (
        <div key={index} className="flex items-center gap-[8px] mb-2">
          <span className="icon-[solar--document-outline]"></span>
          <p className="font-medium text-[12px] lg:text-[16px]">{doc}</p>

          <DocActionPopup />
        </div>
      ))}
    </div>
  );
};

export default LinkedDocs;
