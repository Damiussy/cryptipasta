import Layout from '../components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="linear-text-gradient">
        <div className="linear-text-gradient bona-nova-sc-bold">
          <h1 className="titleI">
            Welcome to the Cryptipasta database!
          </h1>
        </div>

        <div className="linear-textT-gradient bona-nova-sc-regular">
          <p className="textI">
            This database is an individual attempt at gathering and restoring what was left of the ▇▇▇▇▇▇ Project archives that
            went up in flames on the ▇th of June 18▇▇. The cause of the incident is still unknown to this day. 
            <br /><br />
            It is purely for educational purposes as any signs of life and technology
            inside the ▇▇▇▇▇▇ laboratory has been declared either ▇▇▇▇ or ▇▇▇▇ by the CIA, SRT and FBI on the ▇▇th of May 19▇▇.
            Any scientists - ▇▇▇ or ▇▇▇▇ - affiliated with the Project will have their name censored to avoid any legal pursuits due
            to the ethical reasonings behind this experiment. 
            <br /><br />
            Out of the ▇▇ archives previously stored inside the facility, roughly 30 documents have been recovered and rewritten to avoid
            any instance of ▇▇▇▇ ▇▇▇▇▇▇ ▇▇▇▇▇ in the near future. As we speak, we are still doing our hardest to recover more
            corrupted files, however, with how well and secured these documents were encrypted... it may take a while. 
            <br /><br />
            It is important for everyone to know what happened inside these walls, as we have a nagging feeling that this... is only the
            beginning of something grander, something we cannot control. But for now; we are working on recover the legacy of this mythical
            Project, not spark any conspiracy theories.
            <br /><br />

            (Anything that is has a placeholder image is still under construction, the link to their page will be added later down the line.)
          </p>
        </div>
      </div>
    </Layout>
  );
}