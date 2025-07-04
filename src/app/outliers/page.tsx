import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cryptipasta - Outliers",
  description: "Database of outliers trapped inside the delta supercomputer",
};

const outliers = [
  {
    name: 'Chirpy',
    image: '/images/placeholder.png',
    href: '/outliers/chirpy'
  },
  {
    name: 'Hiroshi',
    image: '/images/placeholder.png',
    href: '/outliers/hiroshi'
  },
  {
    name: 'Donny',
    image: '/images/placeholder.png',
    href: '/outliers/donny'
  },
  {
    name: 'Mark',
    image: '/images/placeholder.png',
    href: '/outliers/mark'
  },
  {
    name: 'Dalibor',
    image: '/images/placeholder.png',
    href: '/outliers/dalibor'
  },
  {
    name: 'Spy',
    image: '/images/placeholder.png',
    href: '/outliers/spy'
  }
];

export default function Outliers() {
  return (
    <Layout>
      <div className="linear-text-gradient">
        <div className="linear-text-gradient bona-nova-sc-bold">
          <h1 className="titleI">
            Outliers!
          </h1>
        </div>

        <div className="linear-textT-gradient bona-nova-sc-regular">
          <p className="textI">
            Not to be confused with people who actually survived the incident, as there was a ▇▇.▇% death rate during the incident.
            Outliers are referred to the ▇▇▇▇ who have been trapped inside the delta supercomputer prior to the incident, being the key
            component of the ▇▇▇▇▇▇ Project alongside the ▇▇▇▇▇▇▇▇. 
            <br /><br />
            They consist of harmless creatures, most notably humans and robloxians. They are varying in ▇▇▇▇▇▇, ▇▇▇, ▇▇▇▇▇▇▇▇▇,
            and abilities. With each having their own distinct strengths and weaknesses. 
            <br /><br />
            As of now, we have inditified 6 ▇▇▇▇▇ inside the delta supercomputer, and we may expand this page if we discover more
            Outliers within the system.
          </p>
        </div>

        <div className="linear-textT-gradient bona-nova-sc-regular">
          <div className="linear-text-gradient bona-nova-sc-bold">
            <h1 className="titleI">
              Current Outliers
            </h1>
          </div>

          {/* Première rangée */}
          <div className="iconTable">
            {outliers.slice(0, 4).map((outlier) => (
              <div key={outlier.name} className="collone">
                <Image 
                  className="iconiqueIcons" 
                  src={outlier.image} 
                  alt={outlier.name}
                  width={100}
                  height={100}
                />
                <Link href={outlier.href} className="liensMenu">
                  {outlier.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Deuxième rangée */}
          <div className="iconTable">
            {outliers.slice(4, 6).map((outlier) => (
              <div key={outlier.name} className="collone">
                <Image 
                  className="iconiqueIcons" 
                  src={outlier.image} 
                  alt={outlier.name}
                  width={100}
                  height={100}
                />
                <Link href={outlier.href} className="liensMenu">
                  {outlier.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}