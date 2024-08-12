// Import jest functions
import { test, expect } from "@jest/globals";

// Impoprt normalizeURL function from crawl.js
import { normalizeURL } from "./crawl.js";

test('normalizeURL strip protocol', () => {

  // should return the URL with no protocol
  const input = 'https://test.com/path'
  const actual = normalizeURL(input)
  const expected = 'test.com/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
  
  // should return the URL with no trailing slash
  const input = 'https://test.com/path/'
  const actual = normalizeURL(input)
  const expected = 'test.com/path'
  expect(actual).toEqual(expected)

})

test('normalizeURL make case lower', () => {
  
  // should return the URL with no trailing slash
  const input = 'https://TEST.com/path/'
  const actual = normalizeURL(input)
  const expected = 'test.com/path'
  expect(actual).toEqual(expected)

})

test('normalizeURL strip http', () => {
  
  // should return the URL with no trailing slash
  const input = 'http://test.com/path/'
  const actual = normalizeURL(input)
  const expected = 'test.com/path'
  expect(actual).toEqual(expected)

})
