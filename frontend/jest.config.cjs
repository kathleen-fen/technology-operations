/* eslint-disable no-undef */
module.exports = {
    preset: 'ts-jest',
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/__mocks__/fileMock.js',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '^components/(.*)$': '<rootDir>/src/components/$1',
      '^styles/(.*)$': '<rootDir>/src/styles/$1',
    },
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['./jest.setup.js'],
  }