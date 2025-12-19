import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { IoMdSearch } from "react-icons/io";

export default function SearchBox({ searchText, setSearchText }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      
  <div className="py-4">
  <div className="w-full flex justify-center pt-4">
    
    {/* Relative wrapper for search bar */}
    <div className="relative flex items-center  p-1 rounded-full w-full text-[#989a9c] bg-[#202c33] hover:border border-gray-700">
      
      {/* Search Icon */}
      <div className="px-2 flex items-center justify-center">
        <IoMdSearch className="text-2xl text-gray-500" />
      </div>

      {/* Input */}
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={isFocused ? "Search the items" : ""}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full p-2 rounded-full outline-none bg-transparent text-white font-normal text-xl"
      />

      {/* Typing animation inside search bar */}
      {!isFocused && searchText === "" && (
        <div className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
          <TypeAnimation
            sequence={[
              'Search "Alice"', 1000,
              'Search "John"', 1000,
              'Search "Family Group"', 1000,
              'Search "Work Chat"', 1000,
              'Search "Important"', 1000,
              'Search "Photos"', 1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>
      )}

    </div>
  </div>
</div>

    </>
  );
}