import React, { createRef, PureComponent } from "react";
import cn from "classnames";
import { List, IListItem } from "../list";
import css from "./absolutList.module.scss";

interface IProps {
  isLoading: boolean;
  list: IListItem[];
  items: IListItem[];
  selectedId: string | number | boolean | null;
  onSelected: (item: IListItem) => void;
  onClose: () => void;
}

interface IState {
  isTopOpen: boolean;
}

export class AbsolutList extends PureComponent<IProps, IState> {
  ref = createRef<HTMLUListElement>();

  state = {
    isTopOpen: false,
  };

  componentDidMount() {
    const displayHeight = document.documentElement.offsetHeight;
    const listBottom = this.ref.current?.getBoundingClientRect().bottom || 0;

    if (displayHeight < listBottom) {
      this.correctionPosition();
    }
  }

  correctionPosition = () => {
    this.setState({
      isTopOpen: true,
    });
  };

  render() {
    const { isLoading, items, list, selectedId, onSelected, onClose } =
      this.props;
    const { isTopOpen } = this.state;

    return (
      <List
        innerRef={this.ref}
        className={cn(css.wrapper, isTopOpen && css.topOpen)}
        isLoading={isLoading}
        list={list}
        items={items}
        selectedId={selectedId}
        onSelected={onSelected}
        onClose={onClose}
      />
    );
  }
}
