import React from 'react';
import ButtonStyled from './Button.Styled';
import ButtonProps from './Button.props';

const Button = (props:ButtonProps) => {
    const {
        disabled, children, styles, onClick, preventDefault,
    } = props;

    const onClickFun = (e: React.MouseEvent<HTMLElement>) => {
        if (preventDefault) {
            e.stopPropagation();
            e.preventDefault();
        }
        if (typeof onClick === 'function') {
            onClick(e);
        }
    };

    return (
        <ButtonStyled disabled={disabled} styles={styles} onClick={e => onClickFun(e)} className="button">
            { children }
        </ButtonStyled>
    );
};
Button.defaultProps = { size: 'medium', variant: 'primary', disabled: false };
export default Button;
