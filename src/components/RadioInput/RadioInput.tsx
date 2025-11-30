interface RadioInputProps<T> {
  name: string;
  value: T;
  label: string;
  isChecked: boolean;
  onSelect: (value: T) => void;
}

const RadioInput = <T,>({
  name,
  value,
  label,
  isChecked,
  onSelect,
}: RadioInputProps<T>) => {
  const id = `${name}-${value}`;
  return (
    <>
      <input
        type='radio'
        id={id}
        name={name}
        value={value as string}
        checked={isChecked}
        onChange={() => onSelect(value)}
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
};

export default RadioInput;
