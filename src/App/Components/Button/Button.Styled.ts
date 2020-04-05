import styled from 'styled-components';

const ButtonStyled = styled.button<{ styles?:string }>`
    text-align: center;
    background-color: #000000;
    color: #ffffff;
    font-size: 14px;
    border-width: 1px;
    border-style: solid;
    border-color: #000000;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    flex-shrink: 0;
    align-items: center;
    font-weight: 700;
    &:active,
    &:hover {
        filter:brightness(0.75);
        box-shadow: 0 0 3px #000000;
    };
    &:focus {
        outline: none;
    };
    &:active {
        filter:brightness(1);
        background-color: #ffffff;
        color: #000000;
        border-color: #ffffff;
        box-shadow: 0 0 1px #000000;
        outline: none;
    }
    ${({ styles }) => {
    if (styles && styles.length > 0) {
        return styles;
    }
    return '';
}}
`;

export default ButtonStyled;
