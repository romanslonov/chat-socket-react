import { h } from 'preact';

export default props => {
  const {
    classes,
    placeholder,
    onClick,
    onChange,
    id,
    type,
    label,
    labelClasses,
    wrapClasses,
    value,
    name,
    required,
    readonly,
    pattern,
    disabled,
  } = props;
  return (
    <div className={wrapClasses || ''}>
      {label && (
        <label
          className={
            labelClasses || 'block text-gray-700 text-sm font-bold mb-2'
          }
          for={id}
        >
          {label}
        </label>
      )}
      <input
        className={
          classes ||
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        }
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange ? e => onChange(e) : null}
        onClick={onClick ? e => onClick(e) : null}
        name={name || ''}
        value={value || ''}
        required={required || false}
        readonly={readonly || false}
        pattern={pattern || null}
        multiple={'multiple' || false}
        disabled={disabled || false}
      />
    </div>
  );
};
