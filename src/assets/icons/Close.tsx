import { FC, SVGProps } from 'react';

export const CloseIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  const { ...rest } = props;

  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M19.25 1.75L1.75 19.25"
        stroke="#8C91B5"
        strokeWidth="2.91667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.75 1.75L19.25 19.25"
        stroke="#8C91B5"
        strokeWidth="2.91667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
