import { Header } from './_components/header';
import { Footer } from './_components/footer';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4">{children}</div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
