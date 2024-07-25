// import "./Header.css";

function Header() {
  console.log("Header");
  return (
    <>
      <header className='flex justify-between items-center py-3 px-8 bg-gray-600'>
        <a className='text-cyan-300 text-2xl' href='#'>
          TMDB
        </a>
        <nav>
          <ul>
            <a className='px-3' href='/'>
              Home
            </a>
            <a className='px-3' href='/movies'>
              Movies
            </a>
            <a className='px-3' href='/shows'>
              TV Shows
            </a>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
