import { JSDOM } from 'jsdom'

// base url - web site domain
// current url - page actively being crawled
// pages - object where K is normalized url and V is number of links

async function crawlPage(baseURL, currentURL, pages) {

  const baseURLobj = new URL(baseURL)
  const currentURLobj = new URL(currentURL)

  // check if a url is on the original domain (basecase 1)
  if(baseURLobj.hostname !== currentURLobj.hostname) {
    return pages
  }
  
  // check if already crawled the current page (basecase 2)
  const normalizedcurrentURL = normalizeURL(currentURL)
  if (pages[normalizedcurrentURL] > 0) {
    pages[normalizedcurrentURL]++
    return pages
  }
  
  pages[normalizedcurrentURL] = 1

  console.log(`actively crawling ${currentURL}`)

  try {
    const resp = await fetch(currentURL)

    // check if status code under 400
    if (resp.status > 399) {
        console.log(`error in fetch with status code ${resp.status} on page ${currentURL}`)
        return pages
      }

    // check if getting html
    const contentType = resp.headers.get('content-type')
    if (!contentType.includes('text/html')) {
        console.log(`non html response. content type ${contentType} on page ${currentURL}`)
      return pages
    }
    
    // store html in variable
    const htmlBody = await resp.text()
   
    // call function to extract URLS from htmlBody
    const nextURLs = getURLsFromHTML(htmlBody, baseURL)
    
    // recursively call crawlPage until above base cases are met
    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages)
    }

  } catch (err) {
    console.log(`error in fetch. ${err.message} on page ${currentURL}`)
  }
  return pages
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = []
  const dom = new JSDOM(htmlBody)
  const linkElements = dom.window.document.querySelectorAll('a')
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === '/') {
      // relative URLs
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`)
        urls.push(urlObj.href)
      } catch (err){
        console.log(`error with relative url: ${err.message}`)
      }
    } else {
      // absoulute URLs
      try {
        const urlObj = new URL(linkElement.href)
        urls.push(urlObj.href)
      } catch (err){
        console.log(`error with absolute url: ${err.message}`)
      }
    }
  }
  return urls
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString)
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`
  if ((hostPath.length > 0) && (hostPath.slice(-1) === '/')) {
    return hostPath.slice(0, -1)
  }
  return hostPath
}

export { normalizeURL };
export { getURLsFromHTML };
export { crawlPage };
