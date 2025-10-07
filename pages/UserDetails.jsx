import { updateUserDetails } from "../store/actions/user.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useNavigate } = ReactRouter
const { useSelector } = ReactRedux

export function UserDetails() {
  const [userDetails, setUserDetails] = useState(null)
  const loggedInUser = useSelector(
    storeState => storeState.userModule.loggedInUser
  )
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedInUser) loadUserDetails()
  }, [])

  function loadUserDetails() {
    setUserDetails({
      fullname: loggedInUser.fullname || "",
      color: loggedInUser.prefs.color || "black",
      bgColor: loggedInUser.prefs.bgColor || "white",
      activities: loggedInUser.activities || [],
    })
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case "number":
      case "range":
        value = +value || ""
        break

      case "checkbox":
        value = target.checked
        break

      default:
        break
    }

    setUserDetails(prevUserDetails => ({ ...prevUserDetails, [field]: value }))
  }

  function onSaveUserDetails(ev) {
    ev.preventDefault()

    const userDetailsToUpdate = {
      fullname: userDetails.fullname,
      prefs: {
        color: userDetails.color,
        bgColor: userDetails.bgColor,
      },
    }

    updateUserDetails(userDetailsToUpdate)
      .then(() => {
        showSuccessMsg("User details updated successfully!")
        navigate("/todo")
      })
      .catch(err => {
        showErrorMsg("Error occurred while updating user details")
      })
  }

  if (!loggedInUser || !userDetails) return <div>No user...</div>
  // const { activities } = userDetails
  return (
    <section className="user-details">
      <h1>Profile</h1>
      <form onSubmit={onSaveUserDetails}>
        <label htmlFor="fullname">Fullname:</label>
        <input
          onChange={handleChange}
          value={userDetails.fullname}
          type="text"
          name="fullname"
          id="fullname"
        />

        <label htmlFor="color">Color:</label>
        <input
          onChange={handleChange}
          value={userDetails.color}
          type="color"
          name="color"
          id="color"
        />

        <label htmlFor="bg-color">Background Color:</label>
        <input
          onChange={handleChange}
          value={userDetails.bgColor}
          type="color"
          name="bgColor"
          id="bg-color"
        />

        <button>Update</button>
      </form>

      {/* {activites && <} */}
    </section>
  )
}
