import React from 'react';
import App from '../App';
import { LoginProvider } from '../src/context/LoginContext';
import Navigation from '../src/screens/MainNavigation';
import renderer from 'react-test-renderer';

jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

describe('App component', () => {
  it('renders for LoginProvider and Navigation components', () => {
    const testRenderer = renderer.create(<App />);
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(LoginProvider)).toBeDefined();
    expect(testInstance.findByType(Navigation)).toBeDefined();
  });
});