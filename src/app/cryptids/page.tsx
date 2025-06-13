import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cryptipasta - Cryptids",
  description: "Database of cryptids and hostile entities from other dimensions",
};

const cryptids = [
  {
    name: 'LIZT_TER',
    image: '/images/monsterIcon/iconLiztter.png',
    href: '/cryptids/liztter'
  },
  {
    name: 'UDC',
    image: '/images/placeholder.png',
    href: '/cryptids/udc'
  },
  {
    name: 'Furnace',
    image: '/images/placeholder.png',
    href: '/cryptids/furnace'
  },
  {
    name: 'Slendrina',
    image: '/images/placeholder.png',
    href: '/cryptids/slendrina'
  },
  {
    name: 'M',
    image: '/images/placeholder.png',
    href: '/cryptids/m'
  },
  {
    name: 'GD15',
    image: '/images/placeholder.png',
    href: '/cryptids/gd15'
  }
];

export default function Cryptids() {
  return (
    <Layout>
      <div className="linear-text-gradient">
        <div className="linear-text-gradient bona-nova-sc-bold">
          <h1 className="titleI">
            Cryptids!
          </h1>
        </div>

        <div className="linear-textT-gradient bona-nova-sc-regular">
          <p className="textI">
            Cryptids, or also referred to as ▇▇▇▇▇▇, are entities that have been ▇▇▇▇▇▇▇▇ from other ▇▇▇▇▇▇▇ into this world.
            They are extremely hostile and are the main focus of the ▇▇▇▇▇▇ Project alongside ▇▇▇▇▇▇▇▇. 
            <br /><br />
            They consist of various aggressive creatures, all varying in species and biology. However, we haven&apos;t been able to decipher a pattern
            as they seem disconnected from each other. Almost as if they didn&apos;t ▇▇▇▇▇▇▇ in this world. 
            <br /><br />
            We have been able to successfully decrypt ▇▇▇ separate cases alongside the research files, however, we weren&apos;t so lucky with the other
            ones as we have still a long way to go. For now, only 6 ▇▇▇▇▇▇ have been recovered, and ▇ more are being currently decrypted, albeit
            more difficult than the others.
          </p>
        </div>

        <div className="linear-textT-gradient bona-nova-sc-regular">
          <div className="linear-text-gradient bona-nova-sc-bold">
            <h1 className="titleI">
              Current Cryptids
            </h1>
          </div>

          {/* Première rangée */}
          <div className="iconTable">
            {cryptids.slice(0, 4).map((cryptid) => (
              <div key={cryptid.name} className="collone">
                <Link href={cryptid.href} className="liensMenu">
                  <img 
                    className="iconiqueIcons" 
                    src={cryptid.image} 
                    alt={cryptid.name}
                  />
                </Link>
                <Link href={cryptid.href} className="liensMenu">
                  {cryptid.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Deuxième rangée */}
          <div className="iconTable">
            {cryptids.slice(4, 6).map((cryptid) => (
              <div key={cryptid.name} className="collone">
                <Link href={cryptid.href} className="liensMenu">
                  <img 
                    className="iconiqueIcons" 
                    src={cryptid.image} 
                    alt={cryptid.name}
                  />
                </Link>
                <Link href={cryptid.href} className="liensMenu">
                  {cryptid.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}