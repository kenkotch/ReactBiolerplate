import { combineReducers } from 'redux'
import AccountantReducer from './AccountantReducer'
import AuthReducer from './AuthReducer'
import EmployeeFormReducer from './EmployeeFormReducer'
import HistoryReducer from './HistoryReducer'
import NewParticipantReducer from './NewParticipantReducer'
import ParticipantReducer from './ParticipantReducer'

export default combineReducers({
  accountantReducer: AccountantReducer,
  auth: AuthReducer,
  employeeForm: EmployeeFormReducer,
  hist: HistoryReducer,
  newParticipant: NewParticipantReducer,
  participantsList: ParticipantReducer
})
