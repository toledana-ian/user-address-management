async function request(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  })

  if (!response.ok) {
    let payload
    try {
      payload = await response.json()
    } catch {
      payload = null
    }
    const error = new Error(payload?.message || `Request failed (${response.status})`)
    error.status = response.status
    error.fieldErrors = payload?.fieldErrors || {}
    throw error
  }

  return response.status === 204 ? null : response.json()
}

export const api = {
  listUsers: (signal) => request('/api/users', { signal }),
  getUser: (userId, signal) => request(`/api/users/${userId}`, { signal }),
  updateProfile: (userId, profile) =>
    request(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profile),
    }),
  createAddress: (userId, address) =>
    request(`/api/users/${userId}/addresses`, {
      method: 'POST',
      body: JSON.stringify(address),
    }),
  updateAddress: (userId, addressId, address) =>
    request(`/api/users/${userId}/addresses/${addressId}`, {
      method: 'PUT',
      body: JSON.stringify(address),
    }),
  deleteAddress: (userId, addressId) =>
    request(`/api/users/${userId}/addresses/${addressId}`, {
      method: 'DELETE',
    }),
}
