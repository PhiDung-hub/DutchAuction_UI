import { ReactNode } from 'react';
import classNames from 'classnames';

const SexyText = ({
  children,
  className,
  animate = true,
}: {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}) => {
  return (
    <div
      className={classNames(
        'text-transparent bg-clip-text from-[rgba(199,242,132,1)] to-[rgba(0,190,240,1)] bg-v3-text-gradient',
        className,
        {
          'animate-hue': animate,
        },
      )}
    >
      {children}
    </div>
  );
};

export default SexyText;

