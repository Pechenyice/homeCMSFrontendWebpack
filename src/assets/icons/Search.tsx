import { FC, SVGProps } from 'react';

export const SearchIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  const { ...rest } = props;

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <circle cx="11" cy="11" r="7" stroke="#8C91B5" stroke-width="2" />
      <path
        d="M20 20L17 17"
        stroke="#8C91B5"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};
