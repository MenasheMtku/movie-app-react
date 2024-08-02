import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <>
      <div className="relative h-[100%] py-1 bg-gray-300 text-black  duration-200  ">
        <div className="ml-auto mr-auto h-full">
          <div className="container mx-auto flex h-full flex-col items-center justify-center gap-2  px-8 py-2 md:flex-row md:justify-between">
            <p>&copy; {currentYear} Menashe Mtku</p>
            <div className="flex gap-3 md:gap-6">
              <a
                href="https://www.linkedin.com/in/menashe-mtku/"
                target="_blank"
              >
                <FaLinkedin className="size-6" />
              </a>
              <a
                href="https://github.com/MenasheMtku/MovieAndTVShowsReact"
                target="_blank"
              >
                <FaSquareGithub className="size-6" />
              </a>
              <a href="">
                <FaFacebookSquare className="size-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
