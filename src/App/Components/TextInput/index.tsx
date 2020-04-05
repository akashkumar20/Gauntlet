/* eslint-disable react/prop-types */
import React from 'react';
import TextInputStyled, {
    Label, InputStyled, Required, InputHolder,
} from './TextInput.Styled';
import TextInputProps from './TextInput.props';

const TextInput = (props:TextInputProps) => {
    const {
        name, placeholder, value, id, onClick, type, onBlur, disabled, onChange, styles, min, max, step, autoFocus, onFocus, onKeyDown: onKeyDownProp, label, className,
    } = props;

    const renderLabel = () => {
        if (label && label.labelValue && label.required) {
            return (
                <Label>
                    <span>
                        {label.labelValue}
                        <Required className="required">
                            *
                        </Required>
                    </span>
                </Label>
            );
        }
        if (label && label.labelValue) {
            return (
                <Label>
                    <span>
                        {label.labelValue}
                    </span>
                </Label>
            );
        }
        return <></>;
    };

    const onKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            const { onEnter } = props;
            if (onEnter) {
                onEnter(e.currentTarget.value);
            }
        }
        if (onKeyDownProp) {
            onKeyDownProp(e);
        }
    };

    return (
        <TextInputStyled className={`text-input ${className}`}>
            {renderLabel()}
            <InputHolder>
                <InputStyled
                    autoComplete="off"
                    autoFocus={autoFocus}
                    disabled={disabled}
                    id={id}
                    max={max}
                    min={min}
                    name={name}
                    placeholder={placeholder}
                    step={step}
                    styles={styles}
                    type={type}
                    value={value}
                    onBlur={e => onBlur && onBlur(e)}
                    onClick={e => onClick && onClick(e)}
                    onChange={e => onChange && onChange(e.target.value)}
                    onFocus={e => onFocus && onFocus(e)}
                    onKeyDown={e => onKeyDown(e)}
                />
            </InputHolder>
        </TextInputStyled>
    );
};

export default TextInput;
