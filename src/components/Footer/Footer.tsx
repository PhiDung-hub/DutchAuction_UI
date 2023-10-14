import Link from 'next/link';
import DiscordIcon from '~/icons/DiscordIcon';
import GithubIcon from '~/icons/GithubIcon';
import TwitterIcon from '~/icons/TwitterIcon';

const Footer = () => {
  return (
    <footer className="flex text-center justify-center items-center p-4 text-xs text-white space-x-4">
      <Link href="https://twitter.com" target="_blank" className="hover:text-v3-primary">
        <TwitterIcon width={40} height={40} />
      </Link>

      <Link href="https://discord.gg" target="_blank" className="hover:text-v3-primary">
        <DiscordIcon width={40} height={40} />
      </Link>

      <Link href="https://github.com" target="_blank" className="hover:text-v3-primary">
        <GithubIcon width={30} height={30} />
      </Link>
    </footer>
  );
};

export default Footer;

