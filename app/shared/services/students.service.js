import axios from 'axios'

export const getStudent = async () => {
  const result = await axios.get('http://dummy.restapiexample.com/api/v1/employees')
  return result
}