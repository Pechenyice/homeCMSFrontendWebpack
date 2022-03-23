import { FC, SVGProps } from 'react';

export const LoaderDarkIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  const { ...rest } = props;

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.358 0.0914308C10.9139 0.0311404 10.4606 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 9.52719 19.9672 9.06203 19.9037 8.6067H17.043C17.1317 9.05742 17.1781 9.52329 17.1781 10C17.1781 13.9644 13.9644 17.1781 10 17.1781C6.03563 17.1781 2.82187 13.9644 2.82187 10C2.82187 6.03563 6.03563 2.82187 10 2.82187C10.4643 2.82187 10.9183 2.86595 11.358 2.95015V0.0914308Z"
        fill="#414FEB"
      />
    </svg>
  );
};

export const LoaderLightIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  const { ...rest } = props;

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.358 0.0914308C10.9139 0.0311404 10.4606 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 9.52719 19.9672 9.06203 19.9037 8.6067H17.043C17.1317 9.05742 17.1781 9.52329 17.1781 10C17.1781 13.9644 13.9644 17.1781 10 17.1781C6.03563 17.1781 2.82187 13.9644 2.82187 10C2.82187 6.03563 6.03563 2.82187 10 2.82187C10.4643 2.82187 10.9183 2.86595 11.358 2.95015V0.0914308Z"
        fill="white"
      />
    </svg>
  );
};
