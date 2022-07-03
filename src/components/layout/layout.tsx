import Navbar from "./navbar";
import Footer from "./footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="mx-16 h-full min-h-full py-8 px-4">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
