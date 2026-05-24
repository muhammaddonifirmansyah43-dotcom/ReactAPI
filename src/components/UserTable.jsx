import styles from './UserTable.module.css';

// Tambahkan onDelete dan onEdit di dalam destrukturisasi props
export default function UserTable({ users, onDelete, onEdit }) {
  return (
    <div className={styles.grid}>
      {users.map((user) => (
        <div key={user.id} className={styles.card}>
          <div className={styles.avatar}>
            {user.name.charAt(0)}
          </div>
          
          <h3 className={styles.name}>{user.name}</h3>
          <p className={styles.email}>📧 {user.email}</p>
          
          <div className={styles.info}>
            <span>📞 {user.phone}</span>
            <span className={styles.website}>🌐 {user.website}</span>
            <span style={{color: '#94a3b8', fontSize: '0.75rem'}}>
              🏢 {user.company?.name}
            </span>
          </div>

          {/* --- BAGIAN TOMBOL AKSI --- */}
          <div className={styles.actionButtons}>
            <button 
              className={styles.editBtn} 
              onClick={() => onEdit(user)}
              title="Edit User"
            >
              ✏️ Edit
            </button>
            <button 
              className={styles.deleteBtn} 
              onClick={() => onDelete(user.id)}
              title="Hapus User"
            >
              🗑️ Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}