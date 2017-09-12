export const isEnvBrowser = () => {
  const isServer =
    typeof window === 'undefined' ||
    navigator.userAgent.includes('Node.js') ||
    navigator.userAgent.includes('jsdom');

  return !isServer;
};
