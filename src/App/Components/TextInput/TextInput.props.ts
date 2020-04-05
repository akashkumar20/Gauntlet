export interface LabelProps {
    labelValue?: string;
    required?: boolean;
}

export default interface TextInputProps {
    disabled?: boolean;
    name?: string;
    placeholder?: string;
    value: string;
    onChange: Function;
    id?: string;
    onClick?: Function;
    type?: string;
    onEnter?: Function;
    min?: number;
    max?: number;
    step?: number;
    onBlur?: Function;
    styles?: string;
    autoFocus?: boolean;
    onFocus?: Function;
    onKeyDown?:Function;
    label?: LabelProps,
    className?: string,
}
