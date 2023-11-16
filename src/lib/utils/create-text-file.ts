export function createTextFile(content: string) {
  return new Blob([content], { type: 'text/plain' })
}
