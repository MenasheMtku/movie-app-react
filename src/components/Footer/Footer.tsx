import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <div className="relative h-[var(--nav-height)] py-1 bg-bkgDarker text-contentDarker duration-200 font-bold">
      <div className="ml-auto mr-auto h-full">
        <div className="max-w-[1440px] mx-auto flex h-full flex-col items-center justify-center gap-2  px-8 py-2 md:flex-row md:justify-between">
          <p>&copy; {currentYear} Menashe Mtku</p>
          <div className="flex gap-3 md:gap-6">
            <a
              href="https://www.linkedin.com/in/menashe-mtku/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="size-6" />
            </a>
            <a
              href="https://github.com/MenasheMtku/MovieAndTVShowsReact"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaSquareGithub className="size-6" />
            </a>
            <a href="" aria-label="Facebook">
              <FaFacebookSquare className="size-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
