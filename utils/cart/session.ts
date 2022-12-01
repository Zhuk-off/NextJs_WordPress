export const storeSession = (session) => {
  if (!session) {
    return null;
  }
  localStorage.setItem('x-wc-session', session);
};

export const getSession = () => {
  return localStorage.getItem('x-wc-session');
};
