"use client";

import Link from 'next/link';
import classNames from 'classnames';
import SwapIcon from '~/icons/SwapIcon';
import RepoLogo from '~/icons/RepoLogo';

import { usePathname } from 'next/navigation';

const HeaderLink = ({
  href,
  isActive,
  title,
  icon,
  className,
}: {
  href: string;
  isActive: boolean;
  title: string | React.ReactNode;
  icon: React.ReactNode;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      shallow
      className={classNames(
        'flex items-center font-semibold text-white/50 hover:text-white fill-current h-[60px] px-4',
        {
          '!text-v3-primary': isActive,
        },
        className,
      )}
    >
      <span className="w-5">{icon}</span>
      <span className="ml-2 whitespace-nowrap">{title}</span>
    </Link>
  );
};

const HeaderLinks = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-1 justify-center text-lg h-full">
      <HeaderLink
        href="/"
        isActive={pathname === "/"}
        title={'Bid'}
        icon={<SwapIcon width="20" height="20" />}
      />
      <HeaderLink
        href="/info"
        isActive={pathname === "/info"}
        title={'Info'}
        icon={<RepoLogo width="20" height="24" />}
      />
    </div>
  );
};

export default HeaderLinks;
