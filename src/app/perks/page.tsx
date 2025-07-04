import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cryptipasta - Perks",
  description: "Database of perks, items, and upgrades available in the delta supercomputer",
};

const perks = [
  {
    name: 'Items',
    image: '/images/placeholder.png',
    href: '/perks/items'
  },
  {
    name: 'Effects',
    image: '/images/placeholder.png',
    href: '/perks/charms'
  },
  {
    name: 'Cosmetics',
    image: '/images/placeholder.png',
    href: '/perks/cosmetics'
  },
  {
    name: 'Emotes',
    image: '/images/placeholder.png',
    href: '/perks/emotes'
  },
  {
    name: 'Masteries',
    image: '/images/placeholder.png',
    href: '/perks/progression'
  },
  {
    name: 'Badges',
    image: '/images/placeholder.png',
    href: '/perks/badges'
  }
];

export default function Perks() {
  return (
    <Layout>
      <div className="linear-text-gradient">
        <div className="linear-text-gradient bona-nova-sc-bold">
          <h1 className="titleI">
            Perks!
          </h1>
        </div>

        <div className="linear-textT-gradient bona-nova-sc-regular">
          <p className="textI">
            Perks are very miscellaneous in nature, they are only usable and present inside the delta supercomputer. They mainly
            compose of cosmetic elements, alongside upgrades and progression for both outliers and killers... 
            <br /><br />
            The reasoning behind Perks are unknown, however, what we do know is that they were the least problematic files to
            decrypt as they were the first documents we had ever decrypted. 
            <br /><br />
            Although, one thing to note is that some files were attached and directly linked to the main data of the outliers/killers,
            which proves that these ▇▇▇▇▇ can have an influence on files that are faintly connected to them. 
            <br /><br />
            We decided to separate the Perks into multiple subclasses, as there are alot to go over. Count at least
            6 pages and ▇▇ subpages within them.
          </p>
        </div>

        <div className="linear-textT-gradient bona-nova-sc-regular">
          <div className="linear-text-gradient bona-nova-sc-bold">
            <h1 className="titleI">
              Current Perks
            </h1>
          </div>

          {/* Première rangée */}
          <div className="iconTable">
            {perks.slice(0, 4).map((perk) => (
              <div key={perk.name} className="collone">
                <Image 
                  className="iconiqueIcons" 
                  src={perk.image} 
                  alt={perk.name}
                  width={100}
                  height={100}
                />
                <Link href={perk.href} className="liensMenu">
                  {perk.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Deuxième rangée */}
          <div className="iconTable">
            {perks.slice(4, 6).map((perk) => (
              <div key={perk.name} className="collone">
                <Image 
                  className="iconiqueIcons" 
                  src={perk.image} 
                  alt={perk.name}
                  width={100}
                  height={100}
                />
                <Link href={perk.href} className="liensMenu">
                  {perk.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}