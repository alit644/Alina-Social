const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <img
        loading="lazy"
        src="/Logomark.svg"
        alt="logo"
        title="logo"
        className="w-[30px] sm:w-[40px] h-[30px] sm:h-[40px]"
      />
      <h1 className="H4 logo">Alina Social</h1>
    </div>
  );
};

export default Logo;
