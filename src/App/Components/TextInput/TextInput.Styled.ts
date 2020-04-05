import styled from 'styled-components';

const TextInputStyled = styled.div`
    position: relative;
`;

const Label = styled.label`
`;

const Required = styled.span`
    color: #E53935;
`;

const InputHolder = styled.div`
    width:100%;
    position: relative;
`;

const InputStyled = styled.input<{ styles?:string }>`
    height: 36px;
    box-shadow: none;
    font-size: 16px;
    color: #000000;
    outline: none;
    border: 1px solid #dadada;
    padding: 0px 10px;
    letter-spacing: 0.15px;
    &:disabled {
        color: #acacac;
        cursor: not-allowed;
    }
    &:focus {
        outline: none;
        border-color: #000;
    }
    ${({ styles }) => {
    if (styles && styles.length > 0) {
        return styles;
    }
    return '';
}}
`;
export default TextInputStyled;
export {
    Label, InputStyled, Required, InputHolder,
};
