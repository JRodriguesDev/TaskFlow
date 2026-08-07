import { Sidebar } from './_components/sideBar';
import { SessionProvider } from 'next-auth/react';

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <SessionProvider>
        <Sidebar />
        <main className="ml-72 flex-1">{children}</main>
      </SessionProvider>
    </div>
  );
};

export default DashBoardLayout;
