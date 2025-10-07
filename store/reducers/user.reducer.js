import { userService } from "../../services/user.service.js"

// User
export const SET_USER = "SET_USER"
export const SET_USER_BALANCE = "SET_USER_BALANCE"
export const SET_USER_FULLNAME = "SET_USER_FULLNAME"
export const SET_USER_PREFS = "SET_USER_PREFS"

const initialState = {
  loggedInUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, cmd) {
  switch (cmd.type) {
    // User
    case SET_USER:
      return {
        ...state,
        loggedInUser: cmd.user,
      }
    case SET_USER_BALANCE:
      return {
        ...state,
        loggedInUser: { ...state.loggedInUser, balance: cmd.balance },
      }
    case SET_USER_FULLNAME:
      return {
        ...state,
        loggedInUser: { ...state.loggedInUser, fullname: cmd.fullname },
      }
    case SET_USER_PREFS:
      return {
        ...state,
        loggedInUser: { ...state.loggedInUser, prefs: { ...cmd.prefs } },
      }
    default:
      return state
  }
}
