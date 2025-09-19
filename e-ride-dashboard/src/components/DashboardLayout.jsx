import { Outlet, Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Drivers", path: "/drivers" },
  { label: "Passengers", path: "/passengers" },
  { label: "Rides", path: "/rides" },
  { label: "Ownership", path: "/ownership" },
  { label: "Reports", path: "/reports" },
]

function DashboardLayout() {
  const location = useLocation()
  return (
    <div className="flex min-h-screen bg-dark font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-dark border-r-2 border-accent flex flex-col shadow-lg">
        <div className="flex flex-col items-center py-8 border-b border-accent">
          <span className="text-3xl font-extrabold text-accent tracking-wide">E-Ride Admin</span>
          
        </div>
        
        <nav className="flex-1 px-6 py-8">
          <ul className="space-y-2">
            {navItems.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-150 ${
                    location.pathname === item.path
                      ? "bg-accent text-dark shadow"
                      : "text-white hover:bg-accent hover:text-dark"
                  }`}
                >
                  <span className="material-icons-outlined">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 text-xs text-white opacity-60 border-t border-accent text-center">
          &copy; {new Date().getFullYear()} E-Ride Dashboard<br />
          All rights reserved.
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-10 py-6 flex items-center justify-between">
                    <img
                    src={logo}
                    alt="Logo"
                    className="w-12 h-12 shadow-lg mb-3 border border-black rounded-md object-contain"
/>

          <span className="px-4 py-1 rounded-full border-2 border-black bg-white
           text-dark font-bold shadow">Online</span>
        </header>
        <hr/>
        <main className="flex-1 bg-white p-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout