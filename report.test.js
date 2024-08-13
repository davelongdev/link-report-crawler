// Import jest functions
import { test, expect } from "@jest/globals";

// Impoprt normalizeURL function from crawl.js
import { sortPages } from "./report.js";


test('sortPages 2 pages', () => {
  
  // should return the URL with no trailing slash
  const input = {
    'https://test.com/path2/': 1,
    'https://test.com/path/': 3
  }
  const actual = sortPages(input)
  const expected = [['https://test.com/path/', 3],
    ['https://test.com/path2/', 1]
  ]
  expect(actual).toEqual(expected)
})

test('sortPages 6 pages', () => {
  
  // should return the URL with no trailing slash
  const input = {
    'https://test.com/path2/': 7,
    'https://test.com/path3/': 2,
    'https://test.com/path1/': 1,
    'https://test.com/path4/': 3,
    'https://test.com/path5/': 5,
    'https://test.com/path6/': 4
  }
  const actual = sortPages(input)
  const expected = [
    ['https://test.com/path2/', 7],
    ['https://test.com/path5/', 5],
    ['https://test.com/path6/', 4],
    ['https://test.com/path4/', 3],
    ['https://test.com/path3/', 2],
    ['https://test.com/path1/', 1],
  ]
  expect(actual).toEqual(expected)
})

