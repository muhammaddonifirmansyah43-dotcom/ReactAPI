import { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './UserTable';
import LoadingSpinner from './LoadingSpinner';
import AddUserForm from './AddUserForm';
import styles from './UserList.module.css';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (err) {
      setError('Gagal mengambil data. Periksa koneksi internet Anda.');
    } finally {
      setLoading(false);
    }
  };

  // --- FITUR CRUD (LOKAL) ---

  // 1. TAMBAH USER
  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [newUser, ...prevUsers]);
    alert("User berhasil ditambahkan!");
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  // 2. HAPUS USER
  const handleDeleteUser = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // 3. EDIT USER (Sederhana menggunakan prompt)
  const handleEditUser = (user) => {
    const newName = prompt("Edit Nama Pengguna:", user.name);
    const newEmail = prompt("Edit Email Pengguna:", user.email);

    if (newName && newEmail) {
      setUsers(users.map(u => 
        u.id === user.id ? { ...u, name: newName, email: newEmail } : u
      ));
      alert("Data berhasil diperbarui!");
    }
  };

  // -------------------------

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  if (error) return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <p style={{ color: 'red' }}>{error}</p>
      <button onClick={fetchUsers} className={styles.refreshButton}>Coba Lagi</button>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <h2>Manajemen Pengguna</h2>
        <p className={styles.stats}>
          Menampilkan {filteredUsers.length} dari {users.length} total pengguna
        </p>
      </div>

      <AddUserForm onAddUser={handleAddUser} />

      <div className={styles.searchWrapper}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="🔍 Cari berdasarkan nama atau email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* UPDATE: Mengirimkan onDelete dan onEdit ke UserTable */}
      <UserTable 
        users={filteredUsers} 
        onDelete={handleDeleteUser} 
        onEdit={handleEditUser} 
      />

      <button onClick={fetchUsers} className={styles.refreshButton}>
        🔄 Reset & Sinkronkan API
      </button>
    </div>
  );
}