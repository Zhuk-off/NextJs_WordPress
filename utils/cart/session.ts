export const storeSession = (session: string):void => {
  if (!session) {
    return null;
  }
  localStorage.setItem('x-wc-session', session);
};

export const getSession = (): string => {
  return localStorage.getItem('x-wc-session');
};
