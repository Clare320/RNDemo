import React from 'react';
import 'react-native';
import Intro from '../src/test/Intro';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
   const tree = renderer.create(<Intro />).toJSON();
   expect(tree).toMatchSnapshot();
});
