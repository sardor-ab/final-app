import { PureComponent, RefObject } from "react";
import { ISelectClear } from "../../Select";

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
  // onBlur={this.onBlur}
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
    } = this.props;
    return (
      <div className={className}>
        {/* <input {...this.props} /> */}
        {/* didn't work, since input received all props, even ones that were not supported */}
        <label>{label}</label>
        <input
          type="text"
          placeholder={placeholder}
          required={required}
          value={value}
          id={id}
          data-test-id={dataTestId}
          onFocus={onFocus}
        />
        {helperText && <span>{helperText}</span>}
      </div>
    );
  }
}
