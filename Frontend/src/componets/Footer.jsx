import React from "react";
import { assets } from "../assets/assets.js";
import { SlSocialFacebook } from "react-icons/sl";
import { IoLogoInstagram } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiTwitterXLine } from "react-icons/ri";

function Footer() {
  const linkSections = [
    {
      title: "Quick Links",

      links: ["Home", "Browse Cars", "List Your Car", "About Us"],
    },

    {
      title: "Resources",

      links: ["Help Center", "Terms of Service", "Privacy Policy", "Insurance"],
    },

    {
      title: "Contact",

      links: [
        "1234 Luxury Drive",
        "San Francisco, CA 94107",
        "+1 234 567890",
        "info@example.com",
      ],
    },
  ];
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <img
            className="w-34 md:w-32"
            src={assets.logo}
            alt="dummyLogoColored"
          />

          <p className="max-w-[410px] mt-6">
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </p>
          <div className="mt-6 flex gap-4 text-2xl">
            <SlSocialFacebook />
            <IoLogoInstagram />
            <MdOutlineMailOutline />
            <RiTwitterXLine />
          </div>
        </div>

        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>

              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:underline transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright 2025 © PrebuiltUI All Right Reserved.
      </p>
    </div>
  );
}

export default Footer;
