type AttachmentProps = {
  size: string;
};

const Attachment = ({ size }: AttachmentProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke="#626262"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M12.948 7.308L7.42 12.835a2.607 2.607 0 1 0 3.689 3.688l5.982-5.982a4.548 4.548 0 0 0 0-6.452a4.549 4.549 0 0 0-6.4.065l-6.034 5.918a6.517 6.517 0 0 0 9.215 9.214l7.377-7.312"
    />
  </svg>
);

export default Attachment;
