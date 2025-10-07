import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

export const userService = {
  getLoggedinUser,
  login,
  logout,
  signup,
  getById,
  query,
  getEmptyCredentials,
  updateBalance,
  updateFullname,
  updatePrefs,
  updateUserDetails,
}
const STORAGE_KEY_LOGGEDIN = "user"
const STORAGE_KEY = "userDB"

function query() {
  return storageService.query(STORAGE_KEY)
}

function getById(userId) {
  return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
  return storageService.query(STORAGE_KEY).then(users => {
    const user = users.find(user => user.username === username)
    if (user) return _setLoggedinUser(user)
    else return Promise.reject("Invalid login")
  })
}

function signup({ username, password, fullname }) {
  const user = { username, password, fullname }
  user.createdAt = user.updatedAt = Date.now()
  user.balance = 0
  user.activities = []
  // Get a CSS variable from :root
  const rootStyles = getComputedStyle(document.documentElement)
  const clr2BgLight = utilService.rgbToHex(
    rootStyles.getPropertyValue("--clr2bg-light").trim()
  )
  const clr1 = utilService.rgbToHex(
    rootStyles.getPropertyValue("--clr1").trim()
  )
  user.prefs = { color: clr2BgLight, bgColor: clr1 }

  return storageService.post(STORAGE_KEY, user).then(_setLoggedinUser)
}

function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
  return Promise.resolve()
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
  const userToSave = {
    _id: user._id,
    fullname: user.fullname,
    balance: user.balance,
    activities: user.activities,
    prefs: user.prefs,
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
  return userToSave
}

function getEmptyCredentials() {
  return {
    fullname: "",
    username: "muki",
    password: "muki1",
  }
}

function updateBalance(addToBalance) {
  const loggedInUser = getLoggedinUser()._id

  return userService
    .getById(loggedInUser)
    .then(user => {
      user.balance += addToBalance

      return storageService.put(STORAGE_KEY, user)
    })
    .then(user => {
      _setLoggedinUser(user)

      return user.balance
    })
}

function updateFullname(newFullname) {
  const loggedInUser = getLoggedinUser()._id

  return userService
    .getById(loggedInUser)
    .then(user => {
      user.fullname = newFullname

      return storageService.put(STORAGE_KEY, user)
    })
    .then(user => {
      _setLoggedinUser(user)

      return user.fullname
    })
}

function updatePrefs(newPrefs) {
  const loggedInUser = getLoggedinUser()._id

  return userService
    .getById(loggedInUser)
    .then(user => {
      user.prefs = { ...newPrefs }

      return storageService.put(STORAGE_KEY, user)
    })
    .then(user => {
      _setLoggedinUser(user)

      return user.prefs
    })
}

function updateUserDetails(newUserDetails) {
  const loggedInUser = getLoggedinUser()._id

  return userService
    .getById(loggedInUser)
    .then(user => {
      user = { ...user, ...newUserDetails }

      return storageService.put(STORAGE_KEY, user)
    })
    .then(user => {
      _setLoggedinUser(user)

      return user
    })
}

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999,
//     balance: 10000,
//     activities: [{txt: 'Added a Todo', at: 1523873242735}]
//     prefs: {color: 'black', bgColor: 'white'}
// }
