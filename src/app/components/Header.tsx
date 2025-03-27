import LogoutButton from "../components/LogoutButton";
import  Navbar from '../components/Navbar';

export default function Header({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <header className="bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {children}
        <LogoutButton />
      </div>
    </header>
    <Navbar />
    </>
  );
}
