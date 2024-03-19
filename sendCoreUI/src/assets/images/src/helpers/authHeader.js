export function authHeader() {
  // return authorization header with basic auth credentials
  let user = localStorage.getItem('token')
  if (user && user) {
    return { Authorization: `Bearer ${user}` }
  } else {
    return {}
  }
}

export function authHeaderWithImage() {
  let user = localStorage.getItem('token')
  if (user && user) {
    return { Authorization: `Bearer ${user}`, 'Content-Type': 'multipart/form-data' }
  } else {
    return {}
  }
}
