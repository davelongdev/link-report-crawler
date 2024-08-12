// Import jest functions
import { test, expect } from "@jest/globals";

// Impoprt normalizeURL function from crawl.js
import { getURLsFromHTML, normalizeURL } from "./crawl.js";

test('getURLsFromHTML absolute', () => {

  // should return the URL with no protocol
  const inputHTMLBody = `
<html>
    <body>
        <a href="https://test.com/path"><span>Go to test.com</span></a>
    </body>
</html>
`
  const inputBaseURL = 'https://test.com'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = ['https://test.com/path']
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {

  // should return the URL with no protocol
  const inputHTMLBody = `
<html>
    <body>
        <a href="/path/"><span>Go to test.com</span></a>
    </body>
</html>
`
  const inputBaseURL = 'https://test.com'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = ['https://test.com/path/']
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative and absolute', () => {

  // should return the URL with no protocol
  const inputHTMLBody = `
<html>
    <body>
        <a href="/path1/">
          Go to test.com/path1
        </a>
        <a href="https://test.com/path2/">
          Go to test.com/path2
        </a>
    </body>
</html>
`
  const inputBaseURL = 'https://test.com'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = ['https://test.com/path1/', 'https://test.com/path2/']
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid URL', () => {

  // should return the URL with no protocol
  const inputHTMLBody = `
<html>
    <body>
        <a href="invalid">
          Go to invalid URL
        </a>
    </body>
</html>
`
  const inputBaseURL = 'https://test.com'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = []
  expect(actual).toEqual(expected)
})

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
