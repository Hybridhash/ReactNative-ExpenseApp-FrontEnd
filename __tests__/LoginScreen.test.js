
import React from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../src/screens/LoginScreen';
import { useLogin } from '../src/context/LoginContext';
import { LoginProvider } from '../src/context/LoginContext';

jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

describe('LoginScreen', () => {
  it('renders Login Screen Component correctly', () => {
    const tree = renderer.create(
      <LoginProvider>
        <LoginScreen />
      </LoginProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});