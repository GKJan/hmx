import sysApi from './sys'
import parkApi from './park'
import sessionApi from './session'
import reportApi from './report'
import primaryApi from './primary'
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
  ...userApi,
  ...logApi,
  ...statisticApi,
  ...certificateApi
}