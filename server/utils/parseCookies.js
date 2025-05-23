function parseCookies(cookieHeader) {
    if (!cookieHeader) return {};
    return Object.fromEntries(
      cookieHeader.split('; ').map(c => {
        const [key, ...v] = c.split('=');
        return [key, v.join('=')];
      })
    );
  }
  
export default parseCookies;