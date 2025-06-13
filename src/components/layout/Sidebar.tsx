import Link from 'next/link';

const menuItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Survivors',
    href: '/survivors',
    subItems: [
      { label: 'Chirpy', href: '/survivors/chirpy' },
      { label: 'Hiroshi', href: '/survivors/hiroshi' },
      { label: 'Donny', href: '/survivors/donny' },
      { label: 'Mark', href: '/survivors/mark' },
      { label: 'More...', href: '/survivors' },
    ],
  },
  {
    label: 'Cryptids',
    href: '/cryptids',
    subItems: [
      { label: 'LIZT_TER', href: '/cryptids/liztter' },
      { label: 'UDC', href: '/cryptids/udc' },
      { label: 'Furnace', href: '/cryptids/furnace' },
      { label: 'Slendrina', href: '/cryptids/slendrina' },
      { label: 'More...', href: '/cryptids' },
    ],
  },
  {
    label: 'Perks',
    href: '/perks',
    subItems: [
      { label: 'Items', href: '/perks/items' },
      { label: 'Charms', href: '/perks/charms' },
      { label: 'Cosmetics', href: '/perks/cosmetics' },
      { label: 'Emotes', href: '/perks/emotes' },
      { label: 'More...', href: '/perks' },
    ],
  },
  {
    label: 'Maps',
    href: '/maps',
    subItems: [
      { label: 'The Cellar', href: '/maps/cellar' },
      { label: 'Dreamland', href: '/maps/dreamland' },
      { label: 'Pumpkin Farm', href: '/maps/pumpkin-farm' },
      { label: 'Checker Void', href: '/maps/checker-void' },
      { label: 'More...', href: '/maps' },
    ],
  },
];

export default function Sidebar() {
    return (
      <div className="linear-text-gradient">
        <div className="linear-text-gradient sixtyfour-convergence-title">
          <h1 className="titleBis">
            קריפטיפסטה
          </h1>
      </div>

      <div className="barSectioning"></div>

      <div className="linear-text-gradient bona-nova-sc-bold">
        <h2 className="titleBis2">
          <u>Gameplay</u>
        </h2>
      </div>

      <div className="linear-textT-gradient bona-nova-sc-regular">
        <nav>
          <ul className="menuAside bona-nova-sc-regular">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="liensMenu"
                >
                  ➤ {item.label}
                </Link>
                
                {item.subItems && (
                  <ul className="sousLiensMenu hover-menu">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.href}>
                        <Link
                          href={subItem.href}
                          className="liensMenu"
                        >
                          ➥ {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}