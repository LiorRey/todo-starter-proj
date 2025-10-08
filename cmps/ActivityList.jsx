import { utilService } from "../services/util.service.js"

export function ActivityList({ activities }) {
  function getActivityFormattedTime(activityTime) {
    return utilService.getFormattedTime(activityTime)
  }

  return (
    <section className="activity-list">
      <h1>Activity List</h1>
      <ul className="clean-list">
        {activities.map(activity => (
          <li key={activity.time}>
            {getActivityFormattedTime(activity.time)} {activity.description}
          </li>
        ))}
      </ul>
    </section>
  )
}
