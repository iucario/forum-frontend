export const parseDate = (timestamp: number) => {
  const d = new Date(timestamp)
  return d.toLocaleString()
}

export const relativeDate = (timestamp: number) => {
  const d = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor(diff / (1000 * 60))
  const seconds = Math.floor(diff / 1000)
  if (days > 0) {
    return `${days} days ago`
  }
  if (hours > 0) {
    return `${hours} hours ago`
  }
  if (minutes > 0) {
    return `${minutes} minutes ago`
  }
  return `${seconds} seconds ago`
}
