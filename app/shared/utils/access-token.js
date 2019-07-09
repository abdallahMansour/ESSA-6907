import queryString from 'query-string'
import { isEmpty } from 'lodash'
import { CONTENT_ARCHITECT } from 'shared/constants'
import { decodeToken } from './decode-header'

export const setAccessTokenIfDefined = () => {
  const parsed = queryString.parse(window.location.search)
  if (!isEmpty(parsed.access_token)) {
    localStorage.setItem('token', parsed.access_token)
    return true
  }
  return false
}
export const getRole = () => {
  const token = localStorage.getItem('token')
  const data = decodeToken(token)
  return data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
}

export const isContentArchitect = role => role === CONTENT_ARCHITECT

export const getUserId = () => {
  const token = localStorage.getItem('token')
  if (!isEmpty(token)) {
    const decodedToken = decodeToken(token)
    return parseInt(
      decodedToken[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ],
      0,
    )
  }
  return -1
}