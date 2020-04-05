/// <reference types="react" />
import ButtonProps from './Button.props';
declare const Button: {
    (props: ButtonProps): JSX.Element;
    defaultProps: {
        size: string;
        variant: string;
        disabled: boolean;
    };
};
export default Button;
