import { Sidebar } from './_components/sideBar';

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-72 flex-1">{children}</main>
    </div>
  );
};

export default DashBoardLayout;
