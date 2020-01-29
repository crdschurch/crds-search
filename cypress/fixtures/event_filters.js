export const metarouter = {
  isSearchEvent: (request) => request.body.event === 'WebsiteSearch',
  isConversionEvent: (request) => request.body.event === 'WebsiteSearchConversion'
}