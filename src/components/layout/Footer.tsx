import Link from 'next/link';

const aboutUsLinks = [
  { label: 'Builder', href: '/about/builder' },
  { label: 'Artists', href: '/about/artists' },
  { label: 'Programmers', href: '/about/programmers' },
];

const socialLinks = [
  { label: 'Roblox', href: '/social/roblox' },
  { label: 'Discord', href: '/social/discord' },
  { label: 'Youtube', href: '/social/youtube' },
];

export default function Footer() {
  return (
    <div className="linear-textT-gradient">
      <div className="alligner">
        <div className="colonne">
          <p className="menuTop bona-nova-sc-bold">About Us</p>
          <nav className="hover-menu">
            {/* UN SEUL <li> pour tous les liens - comme l'original */}
            <li className="menuFooter bona-nova-sc-regular-italic">
              {aboutUsLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="liensMenu"
                >
                  {link.label}
                </Link>
              ))}
            </li>
          </nav>
        </div>

        <div className="colonne">
          <p className="menuTop bona-nova-sc-bold">Game&apos;s Socials</p>
          <nav className="hover-menu">
            {/* UN SEUL <li> pour tous les liens - comme l'original */}
            <li className="menuFooter bona-nova-sc-regular-italic">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="liensMenu"
                >
                  {link.label}
                </Link>
              ))}
            </li>
          </nav>
        </div>
      </div>

      <p className="linear-text-gradient quoteFooter bona-nova-sc-regular-italic">
        Entire site programmed and structured by X and V. :)
      </p>
    </div>
  );
}