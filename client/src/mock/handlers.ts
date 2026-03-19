import { authHandlers } from './handlers/auth'
import { dashboardHandlers } from './handlers/dashboard'
import { stationHandlers } from './handlers/station'
import { operationHandlers } from './handlers/operation'
import { memberHandlers } from './handlers/member'
import { alarmHandlers } from './handlers/alarm'
import { systemHandlers } from './handlers/system'
import { mapHandlers } from './handlers/map'
import { revenueHandlers } from './handlers/revenue'

export const handlers = [
  ...authHandlers,
  ...dashboardHandlers,
  ...stationHandlers,
  ...operationHandlers,
  ...memberHandlers,
  ...alarmHandlers,
  ...systemHandlers,
  ...mapHandlers,
  ...revenueHandlers,
]
