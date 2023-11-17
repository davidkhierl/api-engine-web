export function getNameInitials(name: string) {
  const nameParts = name.split(' ')

  if (nameParts.length > 1) {
    return `${nameParts[0].substring(0, 1).toUpperCase()}${nameParts[1]
      .substring(0, 1)
      .toUpperCase()}`
  }

  return nameParts[0].substring(0, 1).toUpperCase()
}
