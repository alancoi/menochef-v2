import { useState } from 'react';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [users, setUsers] = useState([
    { id: 1, name: 'María García', email: 'maria@gmail.com', acquired: '2024-05-15', usage: 24, lastUsed: '2024-06-22' },
    { id: 2, name: 'Ana López', email: 'ana@hotmail.com', acquired: '2024-04-20', usage: 15, lastUsed: '2024-06-21' },
    { id: 3, name: 'Rosa Martín', email: 'rosa@yahoo.com', acquired: '2024-03-10', usage: 42, lastUsed: '2024-06-22' },
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '' });

  const searches = [
    { term: 'Desinflamarme', count: 145 },
    { term: 'Cena rápida', count: 98 },
    { term: 'Almuerzo', count: 87 },
    { term: 'Pollo', count: 76 },
    { term: 'Zapallo', count: 54 },
  ];

  const addUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([
        ...users,
        {
          id: users.length + 1,
          name: newUser.name,
          email: newUser.email,
          acquired: new Date().toISOString().split('T')[0],
          usage: 0,
          lastUsed: new Date().toISOString().split('T')[0],
        },
      ]);
      setNewUser({ name: '', email: '' });
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const billingThisMonth = 2395;
  const billingLastMonth = 1850;
  const totalUsers = users.length;

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>🔧 Panel de Administración - MenoChef</h1>
        <p>Gestiona usuarios, búsquedas y facturación</p>
      </div>

      {/* KPIs */}
      <div className="kpis">
        <div className="kpi-card">
          <div className="kpi-value">${billingThisMonth.toLocaleString()}</div>
          <div className="kpi-label">Facturación Este Mes</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value">${billingLastMonth.toLocaleString()}</div>
          <div className="kpi-label">Facturación Mes Pasado</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value">{totalUsers}</div>
          <div className="kpi-label">Usuarios Activos</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value">{users.reduce((sum, u) => sum + u.usage, 0)}</div>
          <div className="kpi-label">Usos Totales</div>
        </div>
      </div>

      {/* Secciones */}
      <div className="admin-grid">
        {/* Usuarios */}
        <section className="admin-section">
          <h2>👥 Gestión de Usuarios</h2>

          <div className="add-user-form">
            <input
              type="text"
              placeholder="Nombre"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <button onClick={addUser} className="btn-add">Agregar Usuario</button>
          </div>

          <table className="users-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Adquirió</th>
                <th>Último Uso</th>
                <th>Usos</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.acquired).toLocaleDateString('es-ES')}</td>
                  <td>{new Date(user.lastUsed).toLocaleDateString('es-ES')}</td>
                  <td><span className="badge">{user.usage}</span></td>
                  <td>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="btn-delete"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Búsquedas Populares */}
        <section className="admin-section">
          <h2>🔍 Búsquedas Más Populares</h2>

          <div className="searches-list">
            {searches.map((search, idx) => (
              <div key={idx} className="search-item">
                <div className="search-rank">#{idx + 1}</div>
                <div className="search-info">
                  <div className="search-term">{search.term}</div>
                  <div className="search-count">{search.count} búsquedas</div>
                </div>
                <div className="search-bar">
                  <div
                    className="search-bar-fill"
                    style={{ width: `${(search.count / searches[0].count) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
