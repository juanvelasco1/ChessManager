export const isAuthenticated = () => {
  return localStorage.getItem('authenticated') === 'true';
}

export const login = () => {
  localStorage.setItem('authenticated', 'true');
}

export const logout = () => {
  localStorage.removeItem('authenticated');
}