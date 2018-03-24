export const formatMilliseconds = (ms) => {
  const minutes = Math.floor(ms / 1000 / 60)
  const seconds = Math.round((ms / 1000) - minutes * 60)

  return `${minutes}:${seconds}`
}
