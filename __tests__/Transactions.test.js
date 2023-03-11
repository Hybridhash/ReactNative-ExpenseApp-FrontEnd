
import React from 'react';
import renderer from 'react-test-renderer';
import Transaction from '../src/components/Transactions';

jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

describe('Transaction display  Component', () => {
    it('renders component correctly', () => {
        const tree = renderer.create(
            <Transaction
              title="Test title"
              amount="Test amount"
              formattedDate="Test date"
              rightSwipeActions={() => {}}
            />
          ).toJSON();
          expect(tree).toMatchSnapshot();
    });
});
