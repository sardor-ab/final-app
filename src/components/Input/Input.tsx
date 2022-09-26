import React, { CSSProperties, FC, ReactNode, RefObject } from 'react';
import cn from 'classnames';
import { Spinner as Loader } from '../spinner';
import css from './input.module.scss';

interface IProps {
    value: string;
    label?: string;
    id?: string;
    helperText?: string;
    placeholder?: string;
    className?: string;
    maxLength?: number;
    disabled?: boolean;
    required?: boolean;
    isLoading?: boolean;
    Icon?: ReactNode;
    style?: CSSProperties;
    inputRef?: RefObject<HTMLInputElement>;
    'data-test-id'?: string;
    onChange: (value: any) => void;
    onFocus?: (data: any) => void;
    onBlur?: (data: any) => void;
    onKeyDown?: (data: any) => void;
    onClear?: () => void;
}

export const Input: FC<IProps> = (props: IProps) => {
    const {
        id,
        helperText,
        className,
        style,
        value,
        label,
        Icon,
        inputRef,
        required,
        disabled,
        placeholder,
        isLoading,
        onChange,
        onFocus,
        onBlur,
        onKeyDown,
        onClear,
        maxLength,
    } = props;
    // eslint-disable-next-line react/destructuring-assignment
    const dataTestId = props['data-test-id'] || 'input';

    return (
        <div
            data-test-id={`${dataTestId}-wrapper`}
            style={style}
            className={cn(css.wrapper, className)}>
            {label && (
                <label title={label} htmlFor={id || 'input'}>
                    <div className={cn(css.label, disabled && css.labelDisabled)}>
                        <span>{label}</span>
                        {required && <span className={css.required}>*</span>}
                    </div>
                </label>
            )}
            {Icon && <div className={css.icon}>{Icon}</div>}
            <input
                maxLength={maxLength}
                autoComplete="off"
                data-test-id={dataTestId}
                id={id || 'input'}
                ref={inputRef}
                className={cn(css.input, Icon && css.withIcon)}
                disabled={disabled}
                placeholder={placeholder}
                value={value || ''}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
            />
            {onClear && (
                <div
                    id={`${id}-clearButton`}
                    data-test-id="onClearButton"
                    role="presentation"
                    className={cn(css.clearButton, !value && css.clearButtonDisabled)}
                    onClick={value ? onClear : undefined}>
                    &#10010;
                </div>
            )}
            {isLoading && <Loader className={cn(css.loader)} />}
            {helperText ? (
                <div data-test-id="helperText" title={helperText} className={css.helperText}>
                    <span>{helperText}</span>
                </div>
            ) : null}
        </div>
    );
};
