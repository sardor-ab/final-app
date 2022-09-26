import React from 'react';
import { render } from '@testing-library/react';

import { Spinner } from 'components/spinner';

describe('Spinner test', () => {
    test('snapshot', () => {
        const { asFragment } = render(<Spinner />);

        expect(asFragment()).toMatchSnapshot();
    });
});
