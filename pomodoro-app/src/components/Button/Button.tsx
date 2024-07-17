import './Button.css';

interface ButtonProps {
	text?: string;
	onClick?: () => void;
	children?: React.ReactNode;
	type?: 'submit' | 'button';
}

const Button = ({ text, onClick, type, children }: ButtonProps) => {
	return (
		<button onClick={onClick} type={type}>{text || children}</button>
	)
};

export default Button;