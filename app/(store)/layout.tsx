const Layout = ({ children, authModals }: { children: React.ReactNode; authModals: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Header  /> */}
      <main className="bg-background flex flex-1 flex-col *:nth-last-[2]:pb-8 *:nth-last-[2]:lg:pb-20">
        {children}
        {authModals}
        {/* <Features /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
