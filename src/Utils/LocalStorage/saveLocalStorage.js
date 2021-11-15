export function saveLocalStorage(key, value, day) {
  const now = new Date()
  const item = {
    token: value,
    expiry: now.getTime() + day * 24 * 60 * 60 * 1000,
  }
  localStorage.setItem(key, JSON.stringify(item))
}