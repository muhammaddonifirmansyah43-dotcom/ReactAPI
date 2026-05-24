import { useState } from 'react';
import styles from './AddUserForm.module.css';

export default function AddUserForm({ onAddUser }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // 1. Tambahkan state untuk mendeteksi proses pengiriman
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return alert("Nama dan Email wajib diisi!");

    // 2. Set status menjadi sedang mengirim
    setIsSubmitting(true);

    // Memberikan sedikit jeda (delay) agar tulisan "mengirim" terlihat oleh mata
    // (Simulasi proses jaringan)
    setTimeout(() => {
      onAddUser({
        ...formData,
        id: Date.now(),
        username: formData.name.split(' ')[0].toLowerCase(),
        company: { name: 'New Company' }
      });

      // 3. Reset form dan status setelah selesai
      setFormData({ name: '', email: '', phone: '' });
      setIsSubmitting(false);
    }, 800); // Jeda 0.8 detik
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Tambah Pengguna Baru</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.gridInputs}>
          <input
            className={styles.inputField}
            placeholder="Nama Lengkap"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            disabled={isSubmitting} // Kunci input saat loading
          />
          <input
            className={styles.inputField}
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            disabled={isSubmitting}
          />
          <input
            className={styles.inputField}
            placeholder="Nomor Telepon"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            disabled={isSubmitting}
          />
        </div>

        {/* 4. Logika ganti teks tombol */}
        <button 
          type="submit" 
          className={styles.submitBtn} 
          disabled={isSubmitting} // Tombol tidak bisa diklik saat proses
        >
          {isSubmitting ? '⏳ Sedang Mengirim...' : '🚀 Simpan Data Pengguna'}
        </button>
      </form>
    </div>
  );
}