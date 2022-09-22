import { PureComponent, RefObject } from "react";
import { ISelectClear } from "../../Select";
import cn from "classnames";
import css from "./input.module.scss";

interface IProps {
  "data-test-id"?: string;
  isLoading?: boolean;
  id?: string;
  inputRef?: RefObject<HTMLInputElement>;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus: () => void;
  onBlur: () => void;
  onClear: ISelectClear;
  helperText?: string;
}

export class Input extends PureComponent<
  React.HTMLProps<HTMLInputElement> & IProps
> {
  render() {
    const {
      placeholder,
      className,
      disabled,
      inputRef,
      helperText,
      label,
      isLoading,
      id,
      required,
      style,
      value,
      "data-test-id": dataTestId,
      onFocus,
      onChange,
      onBlur,
    } = this.props;

    return (
      <div className={cn(css.select_input, className)}>
        <label>{label}</label>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          required={required}
          value={value}
          id={id}
          data-test-id={dataTestId}
          onFocus={onFocus}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          style={style}
        />
        {helperText && <span>{helperText}</span>}
      </div>
    );
  }
}
