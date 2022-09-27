import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Input } from '../Input';

describe('Input', () => {
    test('Снимок input-a', () => {
        const { getByTestId } = render(<Input onChange={console.log} value="value" />);

        expect(getByTestId('input')).toMatchSnapshot();
    });

    test('Если есть helperText, то строка должна отобразиться в DOM', () => {
        const { getByTestId } = render(
            <Input helperText="helperText" onChange={console.log} value="value" />
        );

        expect(getByTestId(/helperText/)).toMatchSnapshot();
    });

    test('Если есть label, то строка должна отобразиться в DOM', () => {
        const { getByTestId } = render(
            <Input onChange={console.log} label="label" value="value" />
        );

        expect(getByTestId('input')).toMatchSnapshot();
    });

    test('Если есть onClear, то крестик должен отобразиться в DOM', () => {
        const { getByTestId } = render(
            <Input onChange={console.log} onClear={jest.fn()} value="value" />
        );

        expect(getByTestId('onClearButton')).toBeInTheDocument();
    });

    test('Если нажать на onClear, то вызовется метод onClear', () => {
        const onClear = jest.fn();
        const { getByTestId } = render(
            <Input onChange={console.log} onClear={onClear} value="value" />
        );

        expect(onClear).not.toHaveBeenCalled();

        fireEvent.click(getByTestId('onClearButton'));

        expect(onClear).toHaveBeenCalled();
    });

    test('Если передать isLoading, то появится loader', () => {
        const onClear = jest.fn();
        const { getByTestId } = render(
            <Input onChange={console.log} onClear={onClear} isLoading value="value" />
        );

        expect(getByTestId('loader')).toBeInTheDocument();
    });

    test('Если передать Icon, то компонент должен отобразиться в DOM', () => {
        const Icon = <div data-test-id="inputIcon">icon</div>;
        const { getByTestId } = render(<Input onChange={console.log} Icon={Icon} value="value" />);

        expect(getByTestId('inputIcon')).toBeInTheDocument();
    });
});
