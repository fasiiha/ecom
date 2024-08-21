const Button = ({ text }) => {
  return (
    <button className="px-20 py-2 overflow-hidden border-2 border-black">
      <span className="relative sm:text-lg text-base font-body text-black">
        {text}
      </span>
    </button>
  );
};

export default Button;
