export const toLocalImageUrl = (pathname) => process.env.REACT_APP_IMAGE_URL + pathname

// export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname

export const createSlug = (text: string): string => {
  return text.trim().replace(/\s+/g, '-').toLowerCase()
}
