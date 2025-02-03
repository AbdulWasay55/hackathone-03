import React from "react";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa6";
import { Poppins } from "next/font/google";

const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Footer = () => {
  return (
    <div className="bg-gray-100 mt-20">
      <div className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Image src="/LogoIcon.svg" alt="Logo" width={40} height={40} />
            <p className="text-2xl font-medium">Comforty</p>
          </div>
          <p className="text-gray-700 opacity-60">
            Vivamus tristique odio sit amet velit semper, eu posuere turpis interdum. Cras egestas purus.
          </p>
          <div className="flex gap-4 text-xl">
            <FaFacebook className="text-[#007580] cursor-pointer" />
            <FaTwitter className="text-gray-600 cursor-pointer" />
            <FaInstagram className="text-gray-600 cursor-pointer" />
            <FaPinterest className="text-gray-600 cursor-pointer" />
            <FaYoutube className="text-gray-600 cursor-pointer" />
          </div>
        </div>

        {/* Category */}
        <div>
          <p className="text-sm tracking-widest text-gray-500 font-medium">CATEGORY</p>
          <ul className="mt-5 space-y-3 text-gray-800">
            <li>Sofa</li>
            <li>Armchair</li>
            <li>Wing Chair</li>
            <li className="underline text-[#007580]">Desk Chair</li>
            <li>Wooden Chair</li>
            <li>Park Bench</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <p className="text-sm tracking-widest text-gray-500 font-medium">SUPPORT</p>
          <ul className="mt-5 space-y-3 text-gray-800">
            <li>Help & Support</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Help</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <p className="text-sm tracking-widest text-gray-500 font-medium">NEWSLETTER</p>
          <div className="mt-5 flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-lg p-3 text-gray-700"
                placeholder="Your email"
              />
              <button className="bg-[#029FAE] text-white px-6 py-3 rounded-lg">
                Subscribe
              </button>
            </div>
            <p className="text-gray-600 opacity-60 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt erat enim.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300 mt-10">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className={fontPoppins.className}>
            © 2021 - Blogy - Designed & Developed by Zakirsoft
          </p>
          <Image
            src="/Group 13.svg"
            alt="payment method"
            width={227}
            height={27}
            className="opacity-30 mt-4 md:mt-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
