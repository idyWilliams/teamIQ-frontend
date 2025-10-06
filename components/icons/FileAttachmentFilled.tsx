type FileAttachmentFilledProps = {
  size: string;
  color?: string;
};

const FileAttachmentFilled = ({ size, color = "#c000f7" }: FileAttachmentFilledProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <path
      fill={color}
      d="M13 1H3v22h10.256A4.5 4.5 0 0 1 13 21.5v-6a4.5 4.5 0 0 1 8-2.829V9h-8z"
    />
    <path
      fill={color}
      d="M21 7v-.414L15.414 1H15v6zm-3.5 6a2.5 2.5 0 0 0-2.5 2.5V20a4 4 0 0 0 8 0v-4.5h-2V20a2 2 0 1 1-4 0v-4.5a.5.5 0 0 1 1 0V20h2v-4.5a2.5 2.5 0 0 0-2.5-2.5"
    />
  </svg>
);

export default FileAttachmentFilled;
