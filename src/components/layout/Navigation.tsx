import Link from 'next/link';

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Outliers', href: '/outliers' },
  { label: 'Cryptids', href: '/cryptids' },
  { label: 'Perks', href: '/perks' },
  { label: 'Maps', href: '/maps' },
];

export default function Navigation() {
  return (
    <div className="linear-text-gradient menuHeaderSup">
      <nav className="hover-menu">
        <ul className="menuHeader bona-nova-sc-regular">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="liensMenu"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}