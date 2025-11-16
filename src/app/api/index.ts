export const port = 5000

export const link = 'https://mymemories-backend.onrender.com'
// export const link = `http://localhost:${port}`

export const conf = (jwt : string) => {
  return {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  }
}
// export const getConf = (jwt : string, bod : any) => {
//   return {
//     headers: {
//       Authorization: `Bearer ${jwt}`
//     },
//     body:{
//       ...bod
//     }
//   }
// }