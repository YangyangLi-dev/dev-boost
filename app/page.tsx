import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Developer Helper</h1>
      </main>
    </div>
  );
}
