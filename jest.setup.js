// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import 'isomorphic-fetch';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);


