import { h } from "preact";

export const Button = props => {
  const { classes, buttonText, onClick, type } = props;
  return (
    <button
      className={`px-4 h-10 bg-purple-700 hover:bg-purple-800 text-white rounded ${classes}`}
      onClick={onClick || null}
      type={type || "button"}
    >
      {buttonText}
    </button>
  );
};
