/**
 * Security: CSRF Token Utilities
 * Provides functions to retrieve and include CSRF tokens in API requests
 */

/**
 * Get CSRF token from cookie
 */
export function getCsrfToken(): string | null {
  const name = "csrf_token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

/**
 * Get fetch headers with CSRF token included
 */
export function getCsrfHeaders(): HeadersInit {
  const csrfToken = getCsrfToken();

  if (csrfToken) {
    return {
      "X-CSRF-Token": csrfToken,
    };
  }

  return {};
}
