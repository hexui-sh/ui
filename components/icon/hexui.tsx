type HexUIProps = {
  size?: number | string;
  className?: string;
};

export default function HexUI({ size = 27, className }: HexUIProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      className={`fill-neutral-800 dark:fill-neutral-200 bi bi-moon-stars-fill ${className ?? ""}`.trim()}
      viewBox="0 0 10 11"
    >
      <path
        d="M4.76314 0L9.52628 2.75V8.25L4.76314 11L0 8.25V2.75L4.76314 0Z"
        fill="white"
      />
    </svg>
  );
}
