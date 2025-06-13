import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cryptipasta - Survivors",
  description: "Database of survivors trapped inside the delta supercomputer",
};

const survivors = [
  {
    name: 'Chirpy',
    image: '/images/placeholder.png',
    href: '/survivors/chirpy'
  },
  {
    name: 'Hiroshi',
    image: '/images/placeholder.png',
    href: '/survivors/hiroshi'
  },
  {
    name: 'Donny',
    image: '/images/placeholder.png',
    href: '/survivors/donny'
  },
  {
    name: 'Mark',
    image: '/images/placeholder.png',
    href: '/survivors/mark'
  },
  {
    name: '????',
    image: '/images/placeholder.png',
    href: '/survivors/unknown'
  },
  {
    name: 'Spy',
    image: '/images/placeholder.png',
    href: '/survivors/spy'
  }
];

export default function Survivors() {
  return (
    <Layout>
      <div className="linear-text-gradient">
        <div className="linear-text-gradient bona-nova-sc-bold">
          <h1 className="titleI">
            Survivors!
          </h1>
        </div>

        <div className="linear-textT-gradient bona-nova-sc-regular">
          <p className="textI">
            Not to be confused with people who actually survived the incident, as there was a ▇▇.▇% death rate during the incident.
            Survivors are referred to the ▇▇▇▇ who have been trapped inside the delta supercomputer prior to the incident, being the key
            component of the ▇▇▇▇▇▇ Project alongside the ▇▇▇▇▇▇▇▇. 
            <br /><br />
            They consist of harmless creatures, most notably humans and robloxians. They are varying in ▇▇▇▇▇▇, ▇▇▇, ▇▇▇▇▇▇▇▇▇,
            and abilities. With each having their own distinct strengths and weaknesses. 
            <br /><br />
            As of now, we have inditified 6 ▇▇▇▇▇ inside the delta supercomputer, and we may expand this page if we discover more
            Survivors within the system.
          </p>
        </div>

        <div className="linear-textT-gradient bona-nova-sc-regular">
          <div className="linear-text-gradient bona-nova-sc-bold">
            <h1 className="titleI">
              Current Survivors
            </h1>
          </div>

          {/* Première rangée */}
          <div className="iconTable">
            {survivors.slice(0, 4).map((survivor) => (
              <div key={survivor.name} className="collone">
                <Image 
                  className="iconiqueIcons" 
                  src={survivor.image} 
                  alt={survivor.name}
                  width={100}
                  height={100}
                />
                <Link href={survivor.href} className="liensMenu">
                  {survivor.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Deuxième rangée */}
          <div className="iconTable">
            {survivors.slice(4, 6).map((survivor) => (
              <div key={survivor.name} className="collone">
                <Image 
                  className="iconiqueIcons" 
                  src={survivor.image} 
                  alt={survivor.name}
                  width={100}
                  height={100}
                />
                <Link href={survivor.href} className="liensMenu">
                  {survivor.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}