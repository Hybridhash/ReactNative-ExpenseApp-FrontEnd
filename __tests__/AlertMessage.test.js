import React from 'react';
import renderer from 'react-test-renderer';
import AlertMessage from '../src/components/AlertMessage';

describe('Alert Message Component', () => {
    it('renders component correctly', () => {
        const tree = renderer.create(
            <AlertMessage visible={true} message={['Test message']} onClose={() => {}} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

