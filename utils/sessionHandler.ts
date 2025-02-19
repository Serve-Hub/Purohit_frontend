import Cookies from 'js-cookie';

export function updateSessionToken(): void {
  // Get the access token from cooki
  const accessToken = Cookies.get("accessToken");

  if (accessToken) {
    console.log("Access token found in cookies:", accessToken);

    // Get current session token_id from localStorage
    const sessionToken = localStorage.getItem("token_id");
console.log("sessiontoken is",sessionToken)
    if (!sessionToken) {
      console.log("Session token_id not found, adding it...");
      localStorage.setItem("token_id", accessToken);
    } 

    else {
      console.log("Session token_id is already up-to-date.");
    }
  } else {
    console.log("No access token found in cookies.");
  }
}

// Function to get the current session token_id
export function getSessionToken(): string | null {
  return localStorage.getItem("token_id");
}

// Function to clear session token_id
export function clearSessionToken(): void {
  localStorage.removeItem("token_id");
  console.log("Session token_id removed.");
}
