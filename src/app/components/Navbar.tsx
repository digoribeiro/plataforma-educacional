import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex items-center justify-between flex-wrap p-6">
      <ul className="flex">
        <li className="mr-6">
          <Link className="text-gray-500 hover:text-gray-800" href="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="mr-6">
          <Link className="text-gray-500 hover:text-gray-800" href="/schools">
            Escolas
          </Link>
        </li>
        <li className="mr-6">
          <Link className="text-gray-500 hover:text-gray-800" href="/users">
            Usuários
          </Link>
        </li>
      </ul>
    </nav>
  );
}
