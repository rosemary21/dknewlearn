

// export function parseJwt(token) {
//     try {
//       // Split the token to get the payload part
//       const base64Url = token.split('.')[1];
//       const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//       const jsonPayload = decodeURIComponent(
//         atob(base64)
//           .split('')
//           .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//           .join('')
//       );
  
//       return JSON.parse(jsonPayload);
//     } catch (error) {
//       console.error('Invalid token:', error);
//       return null;
//     }
//   }
  
//   export function isTokenExpired(token) {
//     if (!token) return true; // If there's no token, consider it expired
  
//     const decoded = parseJwt(token);
//     if (!decoded || !decoded.exp) return true; // If decoding fails or no exp, consider expired
  
//     // Check if the token is expired
//     return decoded.exp * 1000 < Date.now();
//   }
  

  export function isTokenExpired() {
    const expiration = localStorage.getItem("tokenExpiration");
  
    // If there's no expiration time, consider it expired
    if (!expiration) return true;
  
    // Check if the current time is past the expiration time
    return Date.now() > parseInt(expiration, 10);
  }
  