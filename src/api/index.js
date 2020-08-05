import sysApi from './sys'
import parkApi from './park'
import sessionApi from './session'
import reportApi from './report'
import primaryApi from './primary'
import basketApi from './basket'
import userApi from './user'
import logApi from './log'
import statisticApi from './statistic'
import certificateApi from './certificate'

export default {
  ...sysApi,
  ...parkApi,
  ...sessionApi,
  ...reportApi,
  ...primaryApi,
  ...basketApi,
  ...userApi,
  ...logApi,
  ...statisticApi,
  ...certificateApi
}