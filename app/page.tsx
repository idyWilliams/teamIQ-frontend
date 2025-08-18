import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <h1 className="text-6xl font-bold text-iq-100">Team IQ</h1>
      <Link href="/login">Login</Link>
      <Link href="/organization">Organizatin</Link>
    </div>
  );
}
