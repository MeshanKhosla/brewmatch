/** Hover effect on a card */
const CardHover = () => {
  return (
    <div>
      <span className="absolute top-0 -z-10 h-0.5 w-0.5 rounded-full bg-lime-600/50 transition-all duration-300 group-hover:scale-[800]"></span>
      <div className="relative mx-auto max-w-md">
        <span className="grid h-full w-full rounded-lg transition-all duration-300 group-hover:bg-lime-500/50"></span>
      </div>
    </div>
  );
};

export default CardHover;
