import { FC, SVGProps } from 'react';

export const KebabIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  const { ...rest } = props;

  return (
    <svg
      width="20"
      height="4"
      viewBox="0 0 20 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <circle cx="2" cy="2" r="2" fill="#414FEB" />
      <circle cx="10" cy="2" r="2" fill="#414FEB" />
      <circle cx="18" cy="2" r="2" fill="#414FEB" />
    </svg>
  );
};
