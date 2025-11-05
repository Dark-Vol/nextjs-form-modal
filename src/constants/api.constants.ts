export const API_ENDPOINTS = {
  USERS: '/users',
  USER_BY_ID: (id: number | string) => `/users/${id}`,
} as const

export const FILE_PATHS = {
  USERS_DATA: 'data/users.json',
} as const



