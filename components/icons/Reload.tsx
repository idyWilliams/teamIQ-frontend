type ReloadProps = {
  size: string;
};

const Reload = ({ size }: ReloadProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="#086ACE"
  >
    <g
      fill="none"
      stroke="#086ACE"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M19.933 13.041a8 8 0 1 1-9.925-8.788c3.899-1 7.935 1.007 9.425 4.747" />
      <path d="M20 4v5h-5" />
    </g>
  </svg>
);

export default Reload;
