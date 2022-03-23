import { FC, SVGProps } from 'react';

export const PlusIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  const { ...rest } = props;

  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path d="M7 1L7 13" stroke="#414FEB" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 7L1 7" stroke="#414FEB" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
