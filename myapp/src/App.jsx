import { useState } from 'react';
import './App.css';

function App() {
  const [rows, setRows] = useState([
    { id: 1, name: 'Dinesh' },
    { id: 2, name: 'John' },
    { id: 3, name: 'Jane' },
    { id: 4, name: 'Kumar' }
  ]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleAdd = () => {
    const newId = rows.length ? rows[rows.length - 1].id + 1 : 1;
    setRows([...rows, { id: newId, name: `User ${newId}` }]);
  };

  const handleDelete = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleEdit = (id, name) => {
    setEditId(id);
    setEditName(name);
  };

  const handleSave = (id) => {
    setRows(rows.map(row => row.id === id ? { ...row, name: editName } : row));
    setEditId(null);
    setEditName('');
  };

  const handleCancel = () => {
    setEditId(null);
    setEditName('');
  };

  return (
    <>
      <Text />
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow-lg rounded-4 w-100" style={{ maxWidth: '700px' }}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0 fw-bold text-primary">User Table</h2>
              <button className="btn btn-primary px-4 rounded-pill" onClick={handleAdd}>
                <i className="bi bi-plus-lg me-2"></i>Add
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: '10%' }}>ID</th>
                    <th style={{ width: '40%' }}>Name</th>
                    <th style={{ width: '30%' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(row => (
                    <tr key={row.id}>
                      <td className="fw-semibold">{row.id}</td>
                      <td>
                        {editId === row.id ? (
                          <input
                            type="text"
                            className="form-control rounded-pill"
                            value={editName}
                            autoFocus
                            onChange={e => setEditName(e.target.value)}
                          />
                        ) : (
                          <span className="fs-6">{row.name}</span>
                        )}
                      </td>
                      <td>
                        {editId === row.id ? (
                          <div className="btn-group">
                            <button className="btn btn-success btn-sm rounded-pill" onClick={() => handleSave(row.id)}>
                              <i className="bi bi-check-lg"></i> Save
                            </button>
                            <button className="btn btn-secondary btn-sm rounded-pill" onClick={handleCancel}>
                              <i className="bi bi-x-lg"></i> Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="btn-group">
                            <button className="btn btn-warning btn-sm rounded-pill" onClick={() => handleEdit(row.id, row.name)}>
                              <i className="bi bi-pencil"></i> Edit
                            </button>
                            <button className="btn btn-danger btn-sm rounded-pill" onClick={() => handleDelete(row.id)}>
                              <i className="bi bi-trash"></i> Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center text-muted py-4">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Text() {
  return (
    <div className="container mt-4">
      <div className="alert alert-info rounded-pill text-center shadow-sm fw-semibold">
        Hello User !
      </div>
    </div>
  );
}

export default App;