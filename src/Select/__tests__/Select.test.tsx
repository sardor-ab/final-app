import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Select } from '../Select';

describe('Select', () => {
    const items = [
        { id: 'id_1', name: 'name_1' },
        { id: 'id_2', name: 'name_2' },
    ];

    test('Снимок компонента', () => {
        const { getByTestId } = render(<Select items={items} onChange={jest.fn()} />);

        expect(getByTestId('select')).toMatchSnapshot();
    });

    test('Снимок компонента с props.fixedPosition и видимым выпадающем списком', () => {
        const { getByTestId } = render(<Select fixedPosition items={items} onChange={jest.fn()} />);

        getByTestId('select_input').focus();

        expect(getByTestId('select')).toMatchSnapshot();
    });

    test('Компонента с props.fixedPosition и "Ничего не найдено"', () => {
        const { getByTestId, queryByText } = render(
            <Select fixedPosition items={items} onChange={jest.fn()} />
        );

        getByTestId('select_input').focus();

        fireEvent.change(getByTestId('select_input'), { target: { value: 'name_2222' } });

        expect(queryByText(/Ничего не найдено/)).toBeInTheDocument();
    });

    test('Компонента с props.fixedPosition и "нет данных"', () => {
        const { getByTestId, queryByText } = render(
            <Select fixedPosition items={undefined} onChange={jest.fn()} />
        );

        getByTestId('select_input').focus();

        expect(queryByText(/Нет данных/)).toBeInTheDocument();
    });

    test('Компонент с props.fixedPosition=false и "нет данных"', () => {
        const { getByTestId, queryByText } = render(
            <Select fixedPosition={false} items={undefined} onChange={jest.fn()} />
        );

        getByTestId('select_input').focus();

        expect(queryByText(/Нет данных/)).toBeInTheDocument();
    });

    // eslint-disable-next-line max-len
    test('Снимок компонента с props.fixedPosition=false (position: absolut) и видимым выпадающем списком', () => {
        const { getByTestId } = render(
            <Select fixedPosition={false} items={items} onChange={jest.fn()} />
        );

        getByTestId('select_input').focus();

        expect(getByTestId('select')).toMatchSnapshot();
    });

    test('Если передать props.isLoading, то в DOM должен появиться Loader', () => {
        const { getByTestId } = render(<Select items={items} isLoading onChange={jest.fn()} />);

        expect(getByTestId(/loader/)).toBeInTheDocument();
    });

    test('Если передать props.className, то оно должно появиться в DOM', () => {
        const className = 'amazingClassName';
        const { getByTestId } = render(
            <Select items={items} className={className} onChange={jest.fn()} />
        );

        expect(getByTestId('select')).toHaveClass(className);
    });

    test('Если передать props.style, то в DOM должна появиться inline стиль для компонента', () => {
        const style = { background: 'red' };
        const { getByTestId } = render(<Select style={style} items={items} onChange={jest.fn()} />);

        expect(getByTestId('select')).toHaveStyle(style);
    });

    // eslint-disable-next-line max-len
    test('Если передать props.isLoading и выбрать input, то в DOM должна появиться надпись "...загрузка"', () => {
        const { getByText, getByTestId } = render(
            <Select items={items} isLoading onChange={jest.fn()} />
        );

        getByTestId('select_input').focus();

        expect(getByText(/...загрузка/)).toBeInTheDocument();
    });

    // eslint-disable-next-line max-len
    test('Если передать props.items пустой массив и выбрать input, то в DOM должна появиться надпись "Нет данных"', () => {
        const { getByText, getByTestId } = render(<Select items={[]} onChange={jest.fn()} />);

        getByTestId('select_input').focus();

        expect(getByText(/Нет данных/)).toBeInTheDocument();
    });

    test('Если передать props.disabled, то выпадающий список не должен появляться', () => {
        const { getByTestId, queryByText } = render(
            <Select disabled items={items} onChange={jest.fn()} />
        );

        getByTestId('select_input').focus();

        expect(queryByText(/name_1/)).not.toBeInTheDocument();
    });

    test('Если передать props.label, то его значение должно появиться в DOM', () => {
        const { getByText } = render(
            <Select label="label" required items={items} onChange={jest.fn()} />
        );

        expect(getByText(/label/)).toBeInTheDocument();
    });

    // eslint-disable-next-line max-len
    test('Если передать props.required и props.label, то должна в DOM появиться label с "*"', () => {
        const { getByText } = render(
            <Select label="label" required items={items} onChange={jest.fn()} />
        );

        expect(getByText(/label */)).toBeInTheDocument();
    });

    // eslint-disable-next-line max-len
    test('Если передать props.helperText, то должна в DOM появиться компонент HelperText с содержимым', () => {
        const helperText = 'amazingHelperText';
        const { getByText, getByTestId } = render(
            <Select label="label" helperText={helperText} items={items} onChange={jest.fn()} />
        );

        expect(getByTestId(/helperText/)).toBeInTheDocument();
        expect(getByText(new RegExp(helperText))).toBeInTheDocument();
    });

    test('Если передать props.onChange, то при выборе item должен вызваться метод onChange', () => {
        const mockOnChange = jest.fn();
        const { getByText, getByTestId } = render(<Select items={items} onChange={mockOnChange} />);

        getByTestId('select_input').focus();

        expect(mockOnChange).not.toHaveBeenCalled();

        fireEvent.click(getByText(new RegExp(items[0].name)));

        expect(mockOnChange).not.toHaveBeenCalledWith(items[0]);
    });

    // eslint-disable-next-line max-len
    test('Если передать props.onChange и props.name, то при выборе item должен вызваться метод onChange, где вторым аргументом будет занчение name', () => {
        const mockOnChange = jest.fn();
        const nockName = 'amazingName';
        const { getByText, getByTestId } = render(
            <Select name={nockName} items={items} onChange={mockOnChange} />
        );

        getByTestId('select_input').focus();

        expect(mockOnChange).not.toHaveBeenCalled();

        const element = getByText(new RegExp(items[0].name));

        fireEvent.mouseDown(element);

        expect(mockOnChange).toHaveBeenCalledWith(items[0], nockName);
    });

    // eslint-disable-next-line max-len
    test('Если открыт выпадающий список, то можно перемещаться клавишами вверх и выбирать по кнопке Enter', () => {
        const mockOnChange = jest.fn();
        const { getByTestId } = render(<Select items={items} onChange={mockOnChange} />);

        getByTestId('select_input').focus();

        expect(mockOnChange).not.toHaveBeenCalled();

        fireEvent.keyDown(getByTestId('select'), { key: 'ArrowUp' });
        fireEvent.keyDown(getByTestId('select'), { key: 'Enter' });

        expect(mockOnChange.mock.calls[0][0]).toEqual(items[1]);
    });

    // eslint-disable-next-line max-len
    test('Если открыт выпадающий список, то можно перемещаться клавишами вниз и выбирать по кнопке "Пробел"', () => {
        const mockOnChange = jest.fn();
        const { getByTestId } = render(<Select items={items} onChange={mockOnChange} />);

        getByTestId('select_input').focus();

        expect(mockOnChange).not.toHaveBeenCalled();

        fireEvent.keyDown(getByTestId('select'), { key: 'ArrowDown' });
        fireEvent.keyDown(getByTestId('select'), { key: ' ' });

        expect(mockOnChange.mock.calls[0][0]).toEqual(items[0]);
    });

    test('Когда в списке выбранный элемент переходит от последнего к первому', () => {
        const { getByTestId, queryByText } = render(<Select items={items} onChange={jest.fn()} />);

        getByTestId('select_input').focus();

        fireEvent.keyDown(getByTestId('select'), { key: 'ArrowDown' });
        fireEvent.keyDown(getByTestId('select'), { key: 'ArrowDown' });
        fireEvent.keyDown(getByTestId('select'), { key: 'ArrowDown' });
        fireEvent.keyDown(getByTestId('select'), { key: ' ' });

        expect(queryByText(/name_1/)).not.toBeInTheDocument();
    });

    // eslint-disable-next-line max-len
    test('Если открыт выпадающий список и нажать Escape, то выпадающий список должен закрыться', () => {
        const { queryAllByRole, getAllByRole, getByTestId } = render(
            <Select items={items} onChange={jest.fn()} />
        );

        getByTestId('select_input').focus();

        expect(getAllByRole('presentation')).toHaveLength(2);

        fireEvent.keyDown(getByTestId('select'), { key: 'Escape' });

        expect(queryAllByRole('presentation')).toHaveLength(0);
    });

    test('Сценарий просмотра placeholder у input-a', () => {
        const { getByTestId } = render(<Select items={items} onChange={jest.fn()} />);

        getByTestId('select_input').focus();

        fireEvent.change(getByTestId('select_input'), { target: { value: 'name_2' } });
        fireEvent.keyDown(getByTestId('select'), { key: 'ArrowDown' });
        fireEvent.keyDown(getByTestId('select'), { key: 'Enter' });

        getByTestId('select_input').focus();

        expect(getByTestId('select')).toMatchSnapshot();
    });
});
