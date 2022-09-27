import React, { CSSProperties, Component, RefObject } from "react";
import cn from "classnames";
import {
  EMPTY_DATA,
  EMPTY_SEARCH,
  LOADING_TEXT,
} from "../../../../constants";
import css from "./list.module.scss";

export interface IListItem {
  [key: string]: any;
}

interface IProps {
  className?: string; // inputPosition && styles.fixedPosition
  innerRef: RefObject<HTMLUListElement>;
  style?: CSSProperties;
  isLoading: boolean;
  list: IListItem[];
  items: IListItem[];
  selectedId: string | number | boolean | null;
  onSelected: (item: IListItem) => void;
  onClose: () => void;
}

interface IState {
  activeIndex: number | null;
}

export class List extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const { selectedId, items } = props;
    const activeIndex = items.findIndex((item) => item.id === selectedId);

    this.state = {
      activeIndex: activeIndex < 0 ? null : activeIndex,
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyListener);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyListener);
  }

  keyListener = ({ key }: { key: string }) => {
    const { list, onSelected, onClose } = this.props;
    const { activeIndex } = this.state;
    let newActiveIndex = activeIndex === null ? -1 : activeIndex;

    if (key === "Escape") {
      onClose();

      return;
    }

    // enter или space
    if (key === "Enter" || key === " ") {
      if (activeIndex !== null) {
        onSelected(list[activeIndex]);
        onClose();
      }

      return;
    }

    if (key === "ArrowUp") {
      newActiveIndex -= 1;
    }

    if (key === "ArrowDown") {
      newActiveIndex += 1;
    }

    if (newActiveIndex < 0) {
      newActiveIndex = list.length - 1;
    }

    if (newActiveIndex > list.length - 1) {
      newActiveIndex = 0;
    }

    this.setState({
      activeIndex: newActiveIndex,
    });
  };

  render() {
    const {
      className,
      style,
      isLoading,
      items,
      list,
      selectedId,
      onSelected,
      innerRef,
    } = this.props;
    const { activeIndex } = this.state;
    const isEmptyData = !isLoading && !list.length && !items.length;
    const isEmptySearch = !isLoading && !list.length && items.length;
    const isListRender = !isLoading && list.length && items.length;

    const handleSelected = (item: IListItem) => () => {
      onSelected(item);
    };

    return (
      <ul ref={innerRef} className={cn(css.wrapper, className)} style={style}>
        {isLoading ? <li className={css.item}>{LOADING_TEXT}</li> : null}
        {isEmptyData ? <li className={css.item}>{EMPTY_DATA}</li> : null}
        {isEmptySearch ? <li className={css.item}>{EMPTY_SEARCH}</li> : null}
        {isListRender
          ? list.map((item, index) => {
              const isSelected = selectedId === item.id;
              const isActive = activeIndex === index;

              return (
                <li
                  role="presentation"
                  className={cn(
                    css.item,
                    isSelected && css.selected,
                    isActive && css.active
                  )}
                  onMouseDown={handleSelected(item)}
                  key={`${item.id}`}
                >
                  {item.name}
                </li>
              );
            })
          : null}
      </ul>
    );
  }
}
