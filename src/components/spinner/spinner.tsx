import React from 'react';
import cn from 'classnames';
import './spinner.scss';

type TProps = {
    className?: string;
};

export const Spinner = (props: TProps) => {
    const { className } = props;

    return (
        <div data-test-id="spinner" className={cn(className, 'observer-spinner')}>
            <div className="circle" />
            <div className="circle" />
            <div className="circle" />
        </div>
    );
};
