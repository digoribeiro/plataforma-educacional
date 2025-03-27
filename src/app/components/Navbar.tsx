import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-100 p-6">
      <ul className="flex">
        <li className="mr-6">
          <Link className="text-gray-500 hover:text-gray-800" href="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="mr-6">
          <Link className="text-gray-500 hover:text-gray-800" href="/dashboard/schools">
            Escolas
          </Link>
        </li>
        <li className="mr-6">
          <Link className="text-gray-500 hover:text-gray-800" href="/dashboard/users">
            Usuários
          </Link>
        </li>
      </ul>
    </nav>
  );
}
