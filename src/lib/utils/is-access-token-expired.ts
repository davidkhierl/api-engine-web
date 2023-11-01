import dayjs from 'dayjs'

export function isAccessTokenExpired(expiry: string) {
  return dayjs().isAfter(dayjs.unix(parseInt(expiry)))
}
