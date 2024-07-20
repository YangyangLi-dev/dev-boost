import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link href="/websites" className="hover:text-gray-300">
            Websites
          </Link>
        </li>
        <li>
          <Link href="/release-notes" className="hover:text-gray-300">
            Release Notes
          </Link>
        </li>
        <li>
          <Link href="/todo" className="hover:text-gray-300">
            Todo List
          </Link>
        </li>
      </ul>
    </nav>
  );
}
