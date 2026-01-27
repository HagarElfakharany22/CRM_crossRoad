import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Contacts from "./pages/Contacts";
import Deals from "./pages/Deals";
import Tasks from "./pages/Tasks";
import Reports from "./pages/Reports";

import { dumyData } from "./dumyData";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [leads, setLeads] = useState(dumyData.leads);
  const [contacts,setContacts]=useState(dumyData.contacts);
  const addLead = (lead) =>
    setLeads([...leads, { ...lead, id: Date.now() }]);

  const editLead = (lead) =>
    setLeads(leads.map(l => l.id === lead.id ? lead : l));

  const deleteLead = (id) =>
    setLeads(leads.filter(l => l.id !== id));

const addContacts = (conatct) =>
    setContacts([...contacts, { ...conatct, id: Date.now() }]);

  const editContact = (conatct) =>
   setContacts(contacts.map(l => l.id === conatct.id ? conatct : l));

  const deleteConatact = (id) =>
    setContacts(contacts.filter(l => l.id !== id));

  return (
    <Routes>
       <Route path="/" element={<Login />} />
  {/* <Route path="/register" element={<Register />} /> */}
      <Route path="/layout" element={<Layout />}>
        <Route
      index
      element={
        <ProtectedRoute role="admin">
          <Dashboard />
        </ProtectedRoute>
      }
    />

        <Route
          path="leads"
          element={
            <ProtectedRoute  roles={["admin", "user"]}>
            <Leads
              leads={leads}
              onAdd={addLead}
              onEdit={editLead}
              onDelete={deleteLead}
            />
            </ProtectedRoute>
          }
        />

        <Route path="contacts" element={<Contacts contacts={contacts}
              onAdd={addContacts}
              onEdit={editContact}
              onDelete={deleteConatact} />} />
        <Route path="deals" element={<Deals />} />
        <Route path="tasks" element={<ProtectedRoute  roles={["admin", "employee"]}>
          <Tasks />
        </ProtectedRoute>} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}
