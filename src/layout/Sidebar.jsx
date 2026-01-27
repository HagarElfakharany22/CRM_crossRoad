import { NavLink } from "react-router-dom";

export default function Sidebar({user}) {
  const menuItems =
  user.role === "admin"
    ? [
        { name: "Dashboard", path: "/" },
        { name: "Leads", path: "/leads" },
        { name: "Contacts", path: "/contacts" },
         { name: "Deals", path: "/deals" },
        { name: "Tasks", path: "/tasks" },
        { name: "Reports", path: "/reports" },
        
      ]
    : user.role === "employee"
    ? [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Tasks", path: "/tasks" },
        { name: "Leads ", path: "/leads" },
      ]
    : [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Leads", path: "/leads" },
      ];


  return (
    <aside
      className="d-flex flex-column bg-dark text-white"
      style={{ width: "16rem", minHeight: "100vh" }}
    >
      {/* Logo */}
      <div className="p-3 fs-4 fw-bold text-primary">CRM Pro</div>

      {/* Menu */}
      <nav className="flex-grow-1 px-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `d-block px-3 py-2 mb-1 rounded text-decoration-none ${
                isActive ? "bg-primary text-white" : "text-white"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
