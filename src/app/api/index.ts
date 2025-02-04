export const port = 5000

// export const link = 'https://warm-reef-41256-e838c74ede11.herokuapp.com'
export const link = `http://localhost:${port}`

export const conf = (jwt : string) => {
  return {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  }
}