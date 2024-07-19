import "./Input.css";
interface InputProps {
	type:
		| "text"
		| "password"
		| "email"
		| "checkbox"
		| "number"
		| "radio"
		| "submit";
	value?: string | number;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	autoFocus?: boolean;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}
const Input = ({
	type,
	value,
	placeholder,
	autoFocus,
	onBlur,
	onChange,
	onKeyDown,
  children
}: InputProps) => {
	return (
		<input
			className="custom_input"
			type={type}
			value={value}
			placeholder={placeholder}
			autoFocus={autoFocus}
			onBlur={onBlur}
			onKeyDown={onKeyDown}
			onChange={onChange}
		>
      {children}
    </input>
	);
};

export default Input;
