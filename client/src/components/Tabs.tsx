import { NavLink } from 'react-router-dom'

export default function Tabs() {
  return (
    <nav className="flex space-x-4 mb-8 border-b border-gray-200">
      <NavLink
        to="/shifts"
        className={({ isActive }) => 
          `px-4 py-2 text-sm font-medium rounded-t-lg ${
            isActive 
              ? 'bg-white text-primary border border-b-0 border-gray-200'
              : 'text-gray-500 hover:bg-gray-50'
          }`
        }
      >
        Shifts
      </NavLink>
    </nav>
  )
}