import axios from 'axios'

export const getLocation = async () => {
  const result = await axios.get(' https://ipinfo.io/geo')
  return result
}
export const getTechnologies = async tech => {
  const result = await axios.get(
    `https://technologies-api.gomycode.co/skill/${tech}`,
  )
  return result
}
export const postDeveloper = async developer => {
  console.log('postDeveloper connect.serivce')
  const result = await axios.post(
    'https://gomycode-connect.com/api/developers',
    developer,
  )
  return result
}
export const postEntreprise = async entreprise => {
  const result = await axios.post(
    'https://gomycode-connect.com/api/entreprises',
    entreprise,
  )
  return result
}

