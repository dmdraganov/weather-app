import type { ReactNode } from 'react';

interface RadioInputProps<T> {
  name: string;
  value: T;
  label: ReactNode;
  isChecked: boolean;
  onSelect: (value: T) => void;
  className?: string;
}

const RadioInput = <T extends string | number>({
  name,
  value,
  label,
  isChecked,
  onSelect,
  className,
}: RadioInputProps<T>) => {
  const id = `${name}-${value}`;
  return (
    <label htmlFor={id} className={className}>
      <input
        type='radio'
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        onChange={() => onSelect(value)}
      />
      {label}
    </label>
  );
};

export default RadioInput;
