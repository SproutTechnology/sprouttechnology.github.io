import React, { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <main className="basis-full">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
