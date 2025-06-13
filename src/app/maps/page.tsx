import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cryptipasta - Maps",
  description: "Database of mysterious maps and environments within the delta supercomputer",
};

const maps = [
  {
    name: 'The Cellar',
    image: '/images/placeholder.png',
    href: '/maps/cellar'
  },
  {
    name: 'Dreamland',
    image: '/images/placeholder.png',
    href: '/maps/dreamland'
  },
  {
    name: 'Pumpkin Farm',
    image: '/images/placeholder.png',
    href: '/maps/pumpkin-farm'
  },
  {
    name: 'Checker Void',
    image: '/images/placeholder.png',
    href: '/maps/checker-void'
  },
  {
    name: 'Bomb-Omb Field',
    image: '/images/placeholder.png',
    href: '/maps/bomb-omb-field'
  },
  {
    name: 'Rundown Lab',
    image: '/images/placeholder.png',
    href: '/maps/rundown-lab'
  }
];

export default function Maps() {
  return (
    <Layout>
      <div className="linear-text-gradient">
        <div className="linear-text-gradient bona-nova-sc-bold">
          <h1 className="titleI">
            Maps!
          </h1>
        </div>

        <div className="linear-textT-gradient bona-nova-sc-regular">
          <p className="textI">
            The Maps that these ▇▇▇▇▇ are residing inside are a real enigma to track down, as they seem to always disappear
            and reappearing whenever a certain amount of time passes. Judging by the very nature of these disappearances, we can
            imagine that there is an ▇▇▇▇▇▇▇▇▇▇ that cycles between multiple environments. 
            <br /><br />
            These Maps however, seem to have some sort of connection with the monsters, whether it is their ▇▇▇▇ land or their
            very own ▇▇▇▇▇▇▇ grounds. These lands however, don&apos;t seem to give any advantages to the monster. 
            <br /><br />
            We&apos;ve ran a few programs inside the delta super computer, as there are still a lot of areas that have been left
            in the dark and ▇▇▇▇▇▇▇. For now, we&apos;ve only discovered 6 of them, despite them being rather difficult to decrypt.
          </p>
        </div>

        <div className="linear-textT-gradient bona-nova-sc-regular">
          <div className="linear-text-gradient bona-nova-sc-bold">
            <h1 className="titleI">
              Current Maps
            </h1>
          </div>

          {/* Première rangée */}
          <div className="iconTable">
            {maps.slice(0, 4).map((map) => (
              <div key={map.name} className="collone">
                <Image 
                  className="iconiqueIcons" 
                  src={map.image} 
                  alt={map.name}
                  width={100}
                  height={100}
                />
                <Link href={map.href} className="liensMenu">
                  {map.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Deuxième rangée */}
          <div className="iconTable">
            {maps.slice(4, 6).map((map) => (
              <div key={map.name} className="collone">
                <Image 
                  className="iconiqueIcons" 
                  src={map.image} 
                  alt={map.name}
                  width={100}
                  height={100}
                />
                <Link href={map.href} className="liensMenu">
                  {map.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}