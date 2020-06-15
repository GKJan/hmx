import loginApi from './login'
import parkApi from './park'
import sessionApi from './session'
import reportApi from './report'
import userApi from './user'
import logApi from './log'

export default {
  ...loginApi,
  ...parkApi,
  ...sessionApi,
  ...reportApi,
  ...userApi,
  ...logApi
}