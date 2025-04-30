import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-zinc-100 dark:bg-neutral-800 text-center py-4 mt-10">
      <p className="text-sm text-gray-700 dark:text-white">
        © {new Date().getFullYear()} Aman Gupta. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
