export const isEnvBrowser = !(
  typeof window === 'undefined' ||
  navigator.userAgent.includes('Node.js') ||
  navigator.userAgent.includes('jsdom')
);

// export const isEnvBrowser = () => {
//   const isServer =
//     typeof window === 'undefined' ||
//     navigator.userAgent.includes('Node.js') ||
//     navigator.userAgent.includes('jsdom');

//   return !isServer;
// };

export const isEnvLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);
