import React, { createRef, PureComponent } from 'react';
import { List, IListItem } from '../list';
import * as css from './fixedList.module.scss';

interface IProps {
    isLoading: boolean;
    list: IListItem[];
    items: IListItem[];
    selectedId: string | number | boolean | null;
    onSelected: (item: IListItem) => void;
    onClose: () => void;
    inputPosition: {
        bottom: number;
        height: number;
        left: number;
        right: number;
        top: number;
        width: number;
        x: number;
        y: number;
    } | null;
}

interface IState {
    top: number;
}

export class FixedList extends PureComponent<IProps, IState> {
    ref = createRef<HTMLUListElement>();

    constructor(props: IProps) {
        super(props);

        this.state = {
            top: props.inputPosition?.bottom || 0,
        };
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden';
        window.addEventListener('resize', this.closeListener);

        const displayHeight = document.documentElement.offsetHeight;
        const listBottom = this.ref.current?.getBoundingClientRect().bottom || 0;
        const listHeight = this.ref.current?.getBoundingClientRect().height || 0;

        if (displayHeight < listBottom) {
            this.correctionPosition({ top: displayHeight - listHeight - 10 });
        }
    }

    componentWillUnmount() {
        document.body.style.overflow = '';
        window.removeEventListener('resize', this.closeListener);
    }

    correctionPosition = ({ top }: { top: number }) => {
        this.setState({
            top,
        });
    };

    closeListener = () => {
        const { onClose } = this.props;

        onClose();
    };

    render() {
        const { isLoading, items, list, selectedId, onSelected, onClose, inputPosition } =
            this.props;
        const { x, right, left } = inputPosition || { x: 0, right: 0, left: 0 };
        const { top } = this.state;
        const style = { top, left: x, width: right - left };

        return (
            <div className={css.wrapper}>
                <List
                    innerRef={this.ref}
                    style={style}
                    className={css.list}
                    isLoading={isLoading}
                    list={list}
                    items={items}
                    selectedId={selectedId}
                    onSelected={onSelected}
                    onClose={onClose}
                />
            </div>
        );
    }
}
