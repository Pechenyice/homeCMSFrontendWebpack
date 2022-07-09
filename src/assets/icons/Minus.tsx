import { FC, SVGProps } from 'react';

export const MinusIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  const { ...rest } = props;

  return (
    <svg
      width="14"
      height="2"
      viewBox="0 0 14 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M13 1L1 0.999999"
        stroke="#F13F44"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};
