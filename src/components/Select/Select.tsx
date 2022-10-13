import React, { createRef, PureComponent } from "react";
import cn from "classnames";
import { Input } from "../Input";
import filterList from "../../utils";
import { AbsolutList } from "./components/list/absolutList";
import { FixedList } from "./components/list/fixedList";
import css from "./select.module.scss";

export interface ISelectItem {
  [key: string]: any;
}

export type ISelectChange = (
  item: any,
  multiple: boolean,
  name?: string
) => void;
export type ISelectClear = (item: null, multiple: boolean) => void;

interface IProps {
  "data-test-id"?: string;
  style?: React.CSSProperties;
  isLoading?: boolean;
  disabled?: boolean;
  required?: boolean;
  fixedPosition?: boolean;
  name?: string;
  label?: string;
  className?: string;
  helperText?: string;
  placeholder?: string;
  selectedId?: string | number | boolean;
  multiple: boolean;
  items?: ISelectItem[];
  onChange: ISelectChange;
  onClear?: ISelectClear;
}

interface IState {
  isOpen: boolean;
  search: string;
}

export class Select extends PureComponent<IProps, IState> {
  inputRef = createRef<HTMLInputElement>();

  state = {
    isOpen: false,
    search: "",
  };

  onFocus = () => {
    this.setState({
      isOpen: true,
      search: "",
    });
  };

  onClose = () => {
    // HTMLInputElement
    const inputNode: any = this.inputRef.current;

    inputNode.blur();
  };

  onBlur = () => {
    this.setState({
      isOpen: false,
    });
  };

  onClear = () => {
    const { onClear, multiple } = this.props;

    this.setState(
      {
        isOpen: false,
        search: "",
      },
      // () => onClear(null);
      () => onClear?.(null, multiple)
    );
  };

  handleInputChange = ({ target: { value } }: any) => {
    this.setState({
      search: value,
    });
  };

  handleSelected = (item: ISelectItem) => {
    const { name, onChange, multiple } = this.props;

    onChange(item, multiple, name);
  };

  renderList = () => {
    const { selectedId, isLoading, items, fixedPosition } = this.props;
    const { search } = this.state;
    const list = filterList(items || [], search);

    if (fixedPosition) {
      const inputPosition =
        this.inputRef.current?.getBoundingClientRect() || null;

      return (
        <FixedList
          inputPosition={inputPosition}
          isLoading={Boolean(isLoading)}
          selectedId={selectedId || null}
          onSelected={this.handleSelected}
          onClose={this.onClose}
          list={list}
          items={items || []}
        />
      );
    }

    return (
      <AbsolutList
        isLoading={Boolean(isLoading)}
        selectedId={selectedId || null}
        onSelected={this.handleSelected}
        onClose={this.onClose}
        list={list}
        items={items || []}
      />
    );
  };

  render() {
    const {
      placeholder,
      className,
      disabled,
      selectedId,
      helperText,
      label,
      isLoading,
      required,
      style,
      items,
      multiple,
      onClear,
    } = this.props;

    const { isOpen, search } = this.state;
    const selectedValue = multiple
      ? items
          ?.filter((item) => selectedId?.toString().includes(item.id))
          .map((i) => i.name)
          .join(", ")
      : items?.find((item) => item.id === selectedId)?.name;
    // eslint-disable-next-line react/destructuring-assignment
    const dataTestId = this.props["data-test-id"] || "select";

    return (
      <div
        data-test-id={dataTestId}
        style={style}
        className={cn(css.wrapper, className)}
      >
        <div className={css.select}>
          <Input
            data-test-id={`${dataTestId}_input`}
            label={label}
            isLoading={isLoading}
            id={dataTestId}
            inputRef={this.inputRef}
            className={cn(css.input, isOpen && css.open)}
            required={required}
            disabled={disabled}
            placeholder={selectedValue || placeholder || ""}
            value={isOpen ? search : selectedValue}
            onChange={this.handleInputChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onClear={onClear && this.onClear}
            helperText={helperText}
          />
          <div
            role="presentation"
            onClick={this.onBlur}
            className={cn(
              css.arrow,
              isOpen && css.arrowOpen,
              onClear && css.arrowWithClear
            )}
          >
            <span>&lsaquo;</span>
          </div>
          {isOpen && this.renderList()}
        </div>
      </div>
    );
  }
}
