export const isCustomPageUri = (uri:string) => {
  const pagesToExclude = ['/', '/cart', '/checkout', '/my-account'];

  return pagesToExclude.includes(uri)
};
