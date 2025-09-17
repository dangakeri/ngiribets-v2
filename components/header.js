import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[#303d4a] shadow-md">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/ngiri.png"
            alt="Logo"
            width={150}
            height={40}
            className="cursor-pointer"
          />
        </Link>
      </div>

      {/* Right: Links */}
      <div className="flex gap-4">
        <Link href="/login">
          <button className="px-4 py-2 rounded-md border border-[#a21cf0;] text-[#a21cf0;] hover:bg-[#a21cf0;] hover:text-white transition">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="px-4 py-2 rounded-md bg-[#a21cf0;] text-white transition">
            Register
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
