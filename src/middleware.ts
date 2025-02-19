import { NextResponse } from "next/server";

export default function middleware(req) {
  const verify = req.cookies.get("loggedin")?.value === "true";  
  const panditVerify = req.cookies.get("isPandit")?.value === "true"; 
  const adminVerify = req.cookies.get("isAdmin")?.value === "true"; 

  const { pathname } = req.nextUrl;

  console.log("Middleware check:", {
    loggedIn: verify,
    pandit: panditVerify,
    admin: adminVerify,
    pathname
  });

  // Ignore Next.js internal assets and API routes
  if (
    pathname.startsWith("/_next/") ||  // Ignore Next.js assets
    pathname.startsWith("/favicon.ico") ||  // Ignore favicon
    pathname.startsWith("/api/") 
  ) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login
  if (!verify && (pathname.startsWith("/UserDashboard") || pathname.startsWith("/user") || pathname.startsWith("/pandit") || pathname.startsWith("/admin"))) {
    console.log("Redirecting to /Login - unauthenticated access attempt.");
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  // Redirect logged-in users from root ("/") to their respective dashboards
  if (verify && pathname === "/") {
    if (adminVerify) {
      console.log("Redirecting admin to /admin.");
      return NextResponse.redirect(new URL("/admin", req.url));
    } else if (panditVerify) {
      console.log("Redirecting pandit to /pandit.");
      return NextResponse.redirect(new URL("/pandit", req.url));
    } else {
      console.log("Redirecting user to /user.");
      return NextResponse.redirect(new URL("/user", req.url));
    }
  }

  // Role-based access control:

  // Regular users should not access pandit or admin pages
  if (verify && !panditVerify && !adminVerify && (pathname.startsWith("/pandit") || pathname.startsWith("/admin"))) {
    console.log("User not authorized for pandit or admin sections, redirecting to /user.");
    return NextResponse.redirect(new URL("/user", req.url));
  }

  // Pandits should not access admin pages
  if (panditVerify && !adminVerify && pathname.startsWith("/admin")) {
    console.log("Pandit not authorized for admin section, redirecting to /pandit.");
    return NextResponse.redirect(new URL("/pandit", req.url));
  }

  // Admins should not access pandit or user pages
  if (adminVerify && (pathname.startsWith("/pandit") || pathname.startsWith("/user"))) {
    console.log("Admin not authorized for pandit or user sections, redirecting to /admin.");
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}
