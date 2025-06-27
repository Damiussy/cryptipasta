'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from 'next-auth/react';

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
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const { user, isLoading, isAuthenticated } = useAuth();

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => 
      prev.includes(label) 
        ? prev.filter(menu => menu !== label)
        : [...prev, label]
    );
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="linear-text-gradient">
      <div className="linear-text-gradient sixtyfour-convergence-title">
        <h1 className="titleBis simple-text-blink">
          קריפטיפסטה
        </h1>
      </div>

      <div className="barSectioning"></div>

      <div className="linear-text-gradient bona-nova-sc-bold">
        <h2 className="titleBis2 simple-text-blink">
          <u>Gameplay</u>
        </h2>
      </div>

      <div className="linear-textT-gradient bona-nova-sc-regular">
        <nav>
          <ul className="menuAside bona-nova-sc-regular">
            {menuItems.map((item) => (
              <li key={item.href}>
                {/* Si l'item a des sous-menus, on rend cliquable la flèche */}
                {item.subItems ? (
                  <div className="menu-item-with-arrow">
                    <Link
                      href={item.href}
                      className="liensMenu simple-gray-blink"
                    >
                      {item.label}
                    </Link>
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className="menu-arrow"
                      aria-label={`Toggle ${item.label} menu`}
                    >
                      <span className={`arrow ${openMenus.includes(item.label) ? 'open' : ''}`}>
                        ▼
                      </span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="liensMenu simple-gray-blink"
                  >
                    {item.label}
                  </Link>
                )}
                
                {/* Sous-menu avec animation */}
                {item.subItems && (
                  <ul className={`sousLiensMenu hover-menu ${openMenus.includes(item.label) ? 'open' : 'closed'}`}>
                    {item.subItems.map((subItem) => (
                      <li key={subItem.href}>
                        <Link
                          href={subItem.href}
                          className="liensMenu simple-gray-blink"
                        >
                          ● {subItem.label}
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

      <div className="barSectioning"></div>

      {/* SECTION COMPTE */}
      <div className="linear-text-gradient bona-nova-sc-bold">
        <h2 className="titleBis2 simple-text-blink">
          <u>Account</u>
        </h2>
      </div>

      <div className="linear-textT-gradient bona-nova-sc-regular">
        <nav>
          <ul className="menuAside bona-nova-sc-regular">
            {isLoading ? (
              <li>
                <span className="liensMenu">
                  Loading...
                </span>
              </li>
            ) : isAuthenticated ? (
              // Utilisateur connecté
              <>
                <li>
                  <span className="liensMenu user-info">
                    {user?.name || user?.email}
                  </span>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="liensMenu simple-gray-blink"
                  >
                    Profil
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="liensMenu logout-button simple-gray-blink"
                  >
                    Log Off
                  </button>
                </li>
              </>
            ) : (
              // Utilisateur non connecté
              <>
                <li>
                  <Link
                    href="/auth/signin"
                    className="liensMenu simple-gray-blink"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/signup"
                    className="liensMenu simple-gray-blink"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      <div className="barSectioning"></div>
    </div>
  );
}