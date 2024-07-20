import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Developer Helper</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/websites" className="text-blue-500 hover:underline">
              Websites
            </Link>
          </li>
          <li>
            <Link
              href="/release-notes"
              className="text-blue-500 hover:underline"
            >
              Release Notes
            </Link>
          </li>
          <li>
            <Link href="/todo" className="text-blue-500 hover:underline">
              Todo List
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
