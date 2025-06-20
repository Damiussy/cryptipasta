import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import Sidebar from './Sidebar';
import PageTransition from '../PageTransition';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* Sidebar */}
      <div id="sideWebSup" className="floating">
        <div id="sideContentSup">
          <Sidebar />
        </div>
      </div>

      {/* Separator */}
      <div id="separateSup"></div>

      {/* Main Content avec PageTransition */}
      <PageTransition>
        <div id="mainWebSup">
          {/* Header */}
          <div id="headerSup">
            <Header />
            <Navigation />
          </div>

          {/* Content */}
          <div id="contentSup">
            {children}
          </div>

          {/* Footer */}
          <div id="footerSup">
            <Footer />
          </div>
        </div>
      </PageTransition>
    </>
  );
}