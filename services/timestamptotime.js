export default function timeStampToHumanTime(timestamp) {
    const SECOND = 1000
    const MINUTE = (60 * SECOND)
    const HOUR = (60 * MINUTE)
    const DAY = (24 * HOUR)
    const WEEK = (7 * DAY)
    const YEAR = (52 * WEEK)

    const times = [SECOND, MINUTE, HOUR, DAY, WEEK, YEAR]
    const timeUnits = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'years']
    const timeSingularUnits = ['second', 'minute', 'hour', 'day', 'week', 'year']

    if (timestamp < SECOND) {
        return '1 second'
    }
    if (timestamp > YEAR) {
        const actualTime = Math.round(timestamp / YEAR)

        return `${actualTime} ${(actualTime == 1) ? 'year' : 'years'}`
    }
    const timeArray = times.map((time, i) => {

        if (timestamp < time) {
            const actualTime = Math.round(timestamp / times[i - 1])
            return `${actualTime} ${(actualTime == 1) ? timeSingularUnits[i - 1] : timeUnits[i - 1]}`
        }
        return null
    })

    return timeArray.filter((time) => (time != null))[0]
} 