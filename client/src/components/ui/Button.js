import { h } from 'preact';

export default props => {
  const { classes, buttonText, onClick, type } = props;
  return (
    <button
      className={
        classes ||
        `px-4 h-10 bg-purple-700 hover:bg-purple-800 text-white rounded`
      }
      onClick={onClick || null}
      type={type || 'button'}
    >
      {buttonText}
    </button>
  );
};
