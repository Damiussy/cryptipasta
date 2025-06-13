import Layout from '../../../components/layout/Layout';
import Link from 'next/link';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cryptipasta - LIZT_TER",
  description: "Profile and detailed information about the cybernetic cryptid LIZT_TER",
};

const ProfileStats = () => (
  <aside className="profileAside">
    <div className="center">
      <img className="imageNameLizt" src="/images/monsterName/liztter.png" alt="LIZT_TER Name" />
    </div>
    <div className="barSectioning"></div>

    <img className="imageProfile" src="/images/monsterIcon/iconLiztter.png" alt="LIZT_TER" />
    <p className="quoteProfile quoteProfileColor">
      <i>❝ My son. My creation. ❞</i>
    </p>
    <div className="barSectioning"></div>

    <h2 className="titleList linear-textT-gradient">Stats</h2>
    <div className="barSectioning"></div>

    <div className="statsInline">
      <div className="limitedSpace">
        <p className="textI linear-text-gradient"><strong>Cost</strong></p>
      </div>
      <div className="limitedSpace2">
        <p className="textI linear-text-gradient">Free</p>
      </div>
    </div>

    <div className="statsInline">
      <div className="limitedSpace">
        <p className="textI linear-text-gradient"><strong>Difficulty</strong></p>
      </div>
      <div className="limitedSpace2">
        <p className="textI linear-text-gradient">★★★☆☆</p>
      </div>
    </div>

    <div className="statsInline">
      <div className="limitedSpace">
        <p className="textI linear-textT-gradient"><strong>Damage</strong></p>
      </div>
      <div className="limitedSpace2">
        <p className="textI linear-textT-gradient">20.5/38.5</p>
      </div>
    </div>

    <div className="statsInline">
      <div className="limitedSpace">
        <p className="textI linear-textT-gradient"><strong>Health</strong></p>
      </div>
      <div className="limitedSpace2">
        <p className="textI linear-textT-gradient">1500</p>
      </div>
    </div>

    <div className="statsInline">
      <div className="limitedSpace">
        <p className="textI linear-textT-gradient"><strong>Base/Running Speed</strong></p>
      </div>
      <div className="limitedSpace2">
        <p className="textI linear-textT-gradient">6.5/25</p>
      </div>
    </div>

    <div className="statsInline">
      <div className="limitedSpace">
        <p className="textI linear-textT-gradient"><strong>Stamina</strong></p>
      </div>
      <div className="limitedSpace2">
        <p className="textI linear-textT-gradient">85</p>
      </div>
    </div>

    <div className="statsInline">
      <div className="limitedSpace">
        <p className="textI linear-textT-gradient"><strong>Stamina Loss per Sec</strong></p>
      </div>
      <div className="limitedSpace2">
        <p className="textI linear-textT-gradient">10</p>
      </div>
    </div>

    <div className="statsInline">
      <div className="limitedSpace">
        <p className="textI linear-textT-gradient"><strong>Stamina Gain per Sec</strong></p>
      </div>
      <div className="limitedSpace2">
        <p className="textI linear-textT-gradient">20</p>
      </div>
    </div>
  </aside>
);

const TableOfContents = () => (
  <aside className="menuAside2">
    <div>
      <h2 className="titleList linear-textT-gradient">Content</h2>
    </div>
    <div className="barSectioning"></div>
    <nav className="hover-menu">
      <ul className="listAside">
        <li>
          <Link className="liensMenu linear-textT-gradient" href="#Appearance">
            <strong>1.</strong> Appearance
          </Link>
        </li>
        <li>
          <Link className="liensMenu linear-textT-gradient" href="#Gameplay">
            <strong>2.</strong> Gameplay
          </Link>
        </li>
        <li>
          <Link className="liensMenu linear-textT-gradient" href="#Audio">
            <strong>3.</strong> Audio
          </Link>
        </li>
        <li>
          <Link className="liensMenu linear-textT-gradient" href="#Strategy">
            <strong>4.</strong> Strategy
          </Link>
        </li>
        <li>
          <Link id="sousMenu" className="liensMenu linear-textT-gradient" href="#Tips">
            <strong>4.1.</strong> Tips
          </Link>
        </li>
        <li>
          <Link className="liensMenu linear-textT-gradient" href="#Trivia">
            <strong>5.</strong> Trivia
          </Link>
        </li>
        <li>
          <Link className="liensMenu linear-textT-gradient" href="#Gallery">
            <strong>6.</strong> Gallery
          </Link>
        </li>
      </ul>
    </nav>
  </aside>
);

const MovesetTable = () => (
  <aside className="movesetAside">
    {/* Header Row */}
    <div className="statsInline barSectioning2">
      <div className="movesetBorders movesetSpace">
        <p className="textI linear-textT-gradient">Keybind</p>
      </div>
      <div className="movesetBorders movesetSpace2">
        <p className="textI linear-textT-gradient">Name</p>
      </div>
      <div className="movesetBorders movesetSpace3">
        <p className="textI linear-textT-gradient">Ability</p>
      </div>
      <div className="movesetBorders movesetSpace4">
        <p className="textI linear-textT-gradient">Description</p>
      </div>
      <div className="movesetBorders2 movesetSpace5">
        <p className="textI linear-textT-gradient">Effect</p>
      </div>
    </div>

    {/* Passive */}
    <div className="statsInline barSectioning2">
      <div className="movesetBorders movesetSpace tinyStuff">
        <p className="textI linear-textT-gradient">Passive</p>
      </div>
      <div className="movesetBorders movesetSpace2 tinyStuff">
        <p className="textI linear-textT-gradient">cmd/buffer_overflow.exe</p>
      </div>
      <div className="movesetBorders movesetSpace3 tinyStuff">
        <p className="textI linear-textT-gradient"> </p>
      </div>
      <div className="movesetBorders movesetSpace4 tinyStuff">
        <p className="textI linear-textT-gradient">
          Everytime an objective is completed, <strong>LIZT_TER</strong> regains +35 Stamina and gains <strong>Speed</strong> I for 3 seconds.
        </p>
      </div>
      <div className="movesetBorders2 movesetSpace5 tinyStuff">
        <p className="textI linear-textT-gradient">Grants buffs when survivors complete objectives.</p>
      </div>
    </div>

    {/* M1 */}
    <div className="statsInline barSectioning2">
      <div className="movesetBorders movesetSpace tinyStuff">
        <p className="textI linear-textT-gradient">M1</p>
      </div>
      <div className="movesetBorders movesetSpace2 tinyStuff">
        <p className="textI linear-textT-gradient">Slash</p>
      </div>
      <div className="movesetBorders movesetSpace3 tinyStuff">
        <p className="textI linear-textT-gradient"> </p>
      </div>
      <div className="movesetBorders movesetSpace4 tinyStuff">
        <p className="textI linear-textT-gradient">
          <strong>LIZT_TER</strong> swings his blades downwards in front of him, allowing him to reach a bit further than he can. Inflicting <strong>Bleed I</strong> for 3 seconds.
          <br /><br />
          If M1 is held, inflict <strong>Bleed II</strong> for 2 seconds instead.
        </p>
      </div>
      <div className="movesetBorders2 movesetSpace5 tinyStuff">
        <p className="textI linear-textT-gradient">Deals DMG to survivors.</p>
      </div>
    </div>

    {/* Q */}
    <div className="statsInline barSectioning2">
      <div className="movesetBorders movesetSpace tinyStuff">
        <p className="textI linear-textT-gradient">Q</p>
      </div>
      <div className="movesetBorders movesetSpace2 tinyStuff">
        <p className="textI linear-textT-gradient">os.system(&apos;EXECUTION&apos;)</p>
      </div>
      <div className="movesetBorders movesetSpace3 tinyStuff">
        <p className="textI linear-textT-gradient"> </p>
      </div>
      <div className="movesetBorders movesetSpace4 tinyStuff">
        <p className="textI linear-textT-gradient">
          When pressing Q, <strong>LIZT_TER</strong> tries grabbing in front of it. If successful, it will hold the Survivor&apos;s head up before spinning the blade inside the Survivors Troso for 3 Seconds. Dealing up to 30 DMG and inflicting <strong>Bleed I</strong> for 5 Seconds. If missed, it grants LIZT_TER <strong>Slowness I</strong> for 3 Seconds instead.
          <br /><br />
          If Q is held, <strong>LIZT_TER</strong> will instead stab itself, spinning the Blade and dealing 100 DMG to self, gaining <strong>Speed II</strong> for 5 Seconds.
        </p>
      </div>
      <div className="movesetBorders2 movesetSpace5 tinyStuff">
        <p className="textI linear-textT-gradient">
          Traps and deals DMG to survivors.<br />
          Can gain buffs at the expense of health.
        </p>
      </div>
    </div>

    {/* E */}
    <div className="statsInline barSectioning2">
      <div className="movesetBorders movesetSpace tinyStuff">
        <p className="textI linear-textT-gradient">E</p>
      </div>
      <div className="movesetBorders movesetSpace2 tinyStuff">
        <p className="textI linear-textT-gradient">printf(&quot;HELLO WORLD&quot;)</p>
      </div>
      <div className="movesetBorders movesetSpace3 tinyStuff">
        <p className="textI linear-textT-gradient"> </p>
      </div>
      <div className="movesetBorders movesetSpace4 tinyStuff">
        <p className="textI linear-textT-gradient">
          When pressing E, <strong>LIZT_TER</strong> emits a loud pixelated noise, inflicting <strong>Deafean I</strong> and <strong>Bleed I</strong> to nearby survivors for 8 and 6 seconds respectively. <strong>LIZT_TER</strong> cannot move while casting the move.
          <br /><br />
          If E was held, <strong>LIZT_TER</strong> will start glitching its voice box out. Dealing 50 DMG to self and gaining <strong>Slowness II</strong> for 3 Seconds. Highlighting all survivors in a medium distance for 7 Seconds.
        </p>
      </div>
      <div className="movesetBorders2 movesetSpace5 tinyStuff">
        <p className="textI linear-textT-gradient">
          Disturb survivors and chips at their health.<br />
          Can highlight at the expense of health.
        </p>
      </div>
    </div>

    {/* R - FAULTY_FIREWALL */}
    <div className="statsInline barSectioning2-5">
      <div className="movesetBorders movesetSpace tinyStuff">
        <p className="textI linear-textT-gradient">R</p>
      </div>
      <div className="movesetBorders movesetSpace2 tinyStuff">
        <p className="textI linear-textT-gradient">FAULTY_FIREWALL</p>
      </div>
      <div className="movesetBorders movesetSpace3 tinyStuff">
        <p className="textI linear-textT-gradient"> </p>
      </div>
      <div className="movesetBorders movesetSpace4 tinyStuff">
        <p className="textI linear-textT-gradient">
          This move will only work if near an Objective. Pressing R will corrupt the nearby objective, causing it to look slightly messy and glitchy.
          <br /><br />
          If a Survivor fails a corrupted objective, it will deal 25 DMG to the survivor and emit a loud buzzer sound, highlighting and inflicting
          the survivor with <strong>Blindness I</strong> for 5 Seconds.
          <br /><br />
          If a Survivor completes a corrupted objective, it will instead highlight them and LIZT_TER for 8 Seconds. Only the highlighted players
          can see each other.
        </p>
      </div>
      <div className="movesetBorders2 movesetSpace5 tinyStuff">
        <p className="textI linear-textT-gradient">Trap objectives to highlight players.</p>
      </div>
    </div>
  </aside>
);

export default function LiztterPage() {
  return (
    <Layout>
      <div className="linear-text-gradient">
        {/* Title and Quote */}
        <div className="jacquarda-bastarda-9-regular">
          <h1 className="titleP virusColor">LIZT_TER</h1>
          <h2 className="quoteP virusColor">❝ YOU WERE UNACCOUNTED FOR, I WILL CORRECT THAT. ❞</h2>
        </div>

        <div className="bona-nova-sc-regular">
          {/* Profile and Introduction avec nouveau layout */}
          <div className="contentWithProfile">
            <div className="mainContent">
              <p className="textI linear-textT-gradient">
                <span className="virusColor disable-links">LIZT_TER</span> is the first cryptid ever recorded inside of the database. It is
                a prototype robot gone wrong created by Dr. ▇▇▇▇▇ in ▇▇▇▇. It has been suspected and linked to the ▇▇▇▇▇▇▇▇▇▇▇ of several
                scientists, most notably people who were friends with Dr. ▇▇▇▇▇▇. In the supercomputer, it is &apos;FREE&apos; to use with no currency involved, it&apos;s
                one of the ▇▇▇ &apos;FREE&apos; cryptids inside the database alongside <span className="insaneColor disable-links">UDC</span>.
              </p>

              <TableOfContents />
            </div>
            
            <ProfileStats />
          </div>

          {/* Appearance Section */}
          <div id="Appearance">
            <h2 className="linear-text-gradient titleD">Appearance</h2>
            <div className="barSectioning4"></div>
            <p className="textI linear-textT-gradient">
              <strong>LIZT_TER</strong> is a towering, Cybernetic Cryptid standing at an imposing 7&apos;4&quot;. Their body is encased in a segmented, black exoskeleton-like
              armor, reinforced with jagged, angular plating. Glowing green spikes protrude from key points along their frame—most notably the shoulders, arms, and
              legs—pulsing with an luminescence that suggests an energy source integrated into them. The armor appears both flexible and durable.
              <br /><br />
              
              <strong>LIZT_TER</strong> possesses a monitor-like screen where a head would be. This display typically shows an emoticon,
              but more often than not, it remains a featureless, empty circle. The screen emits a sickly green glow, matching the energy-infused spikes across
              their body. Jagged, wiry antennae extend from the top of the monitor, uneven and erratic in their placement, as if damaged or repurposed.
              <br /><br />

              One of <strong>LIZT_TER</strong>&apos;s defining features is the massive blade integrated into their arm, designed for efficient ▇▇▇▇▇. The blade is capable of
              spinning to ▇▇▇▇ off any excess ▇▇▇▇▇ or to further ▇▇▇▇▇, ensuring it remains sharp and unblemished. Their lower limbs, long and reinforced,
              end in clawed, mechanical feet.
            </p>
          </div>

          {/* Gameplay Section */}
          <div id="Gameplay">
            <h2 className="linear-text-gradient titleD">Gameplay</h2>
            <div className="barSectioning4"></div>
            <p className="textI linear-textT-gradient">
              <strong>LIZT_TER</strong> overall is a rather technical character for a starter, being a semi-hardhitting DoT trapper that focuses on
              setplay and rushing down survivors when it is most favorable. Its kit consists mostly of tools to disturb the survivors, with traps and
              blindness, alongside its signature <strong>Bleed</strong> effect for efficient DoT. However, misuse of its abilities can get its Health                    depleted rather rapidly, encouraging players to only take daring decisions if they are confident or not according to the situation.
            </p>
            <br />

            <MovesetTable />
            <br />
          </div>

          {/* Audio Section */}
          <div id="Audio">
            <h2 className="linear-text-gradient titleD">Audio</h2>
            <div className="barSectioning4"></div>
            <p className="textI linear-textT-gradient">
              This section is still under construction, as we haven't started working on the game.
            </p>
            <br />
          </div>

          {/* Strategy Section */}
          <div id="Strategy">
            <h2 className="linear-text-gradient titleD">Strategy</h2>
            <div className="barSectioning4"></div>
            <p className="textI linear-textT-gradient">
              This section is still under construction, as we haven't started working on the game. <br />
            </p>
            <br />
          </div>

          {/* Tips Section */}
          <div id="Tips">
            <h3 id="sousMenu2" className="linear-text-gradient titleD">Tips</h3>
            <p className="textI linear-textT-gradient">
              Same as above, however, here are a few tips; <br />
              ♢ Misuse of abilities can cause your health to get dangerously low. <br />
              ♢ Rushing down survivors without a proper plan is often futile. <br />
              ♢ More tips may be added later down the line. <br />
            </p>
            <br />
          </div>

          {/* Trivia Section */}
          <div id="Trivia">
            <h2 className="linear-text-gradient titleD">Trivia</h2>
            <div className="barSectioning4"></div>
            <p className="textI linear-textT-gradient">
              ♢ <strong>LIZT_TER</strong> is Non-Binary. <br />
              ♢ It is unclear what <strong>LIZT_TER</strong> would use for pronounces, but it doesn&apos;t seem to care. <br />
              ♢ <strong>LIZT_TER</strong> feels indifferent to any other AI unlike how they share a hard ▇▇▇▇▇ for Robloxians. <br />
              ♢ <strong>LIZT_TER</strong> has a tendency to ▇▇▇▇ at any exposed wires it has. Never fully removing it. <br />
              ♢ If <strong>LIZT_TER</strong> was ever to be used for console games, it&apos;d crash. Their system was built upon Windows ▇▇. <br />
              ♢ If <strong>LIZT_TER</strong> were to get in contact with water, it&apos;d shut down. <br />
              ♢ <strong>LIZT_TER</strong> doesn&apos;t run by battery nor blood. It replenishes energy constantly no matter what. <br />
              ♢ <strong>LIZT_TER</strong> is currently one of the tallest Cryptids. <br />
            </p>
            <br />
          </div>

          {/* Gallery Section */}
          <div id="Gallery">
            <h2 className="linear-text-gradient titleD">Gallery</h2>
            <div className="barSectioning4"></div>
            <p className="textI linear-textT-gradient">
              This section is still under construction, as we haven't started working on the game.
            </p>
            <br />
          </div>
        </div>
      </div>
    </Layout>
  );
}