import Navbar from "./navbar";
import Footer from "./footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-primary h-auto min-h-screen">
      <Navbar />
      <main className="mx-16 h-full min-h-full py-8 px-4">{children}</main>
    </div>
  );
};

export default Layout;
