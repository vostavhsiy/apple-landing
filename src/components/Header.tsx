import { appleImg, bagImg, searchImg } from "@/utils";
import { navLists } from "@/constants";
import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex justify-between w-full screen-max-width">
        <a href="/">
          <Image src={appleImg} alt="Apple" width={14} height={18} />
        </a>

        <div className="absolute-center flex justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <a
              href={`#${nav.toLocaleLowerCase().split(" ").join("")}`}
              key={nav}
              className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
            >
              {nav}
            </a>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <Image src={searchImg} alt="search" width={18} height={18} />
          <Image src={bagImg} alt="bag" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
