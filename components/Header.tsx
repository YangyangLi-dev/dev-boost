import Link from "next/link";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header>
      <Navbar>
        <Link href={"/"}>Favior Websites</Link>
        <Link href={"/release-notes"}>Release Notes</Link>
        <Link href={"/todo"}>Todo</Link>
      </Navbar>
    </header>
  );
}
