type DownArrowProps = {
  size: string;
  className?: string; 
};

const DownArrow = ({ size, className }: DownArrowProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
  >
    <path
      fill="#000000"
      d="M21.886 5.536A1.002 1.002 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13a.998.998 0 0 0 1.644 0l9-13a.998.998 0 0 0 .064-1.033zM12 17.243L4.908 7h14.184L12 17.243z"
    />
  </svg>
);

export default DownArrow;
