import { useState } from 'react';
import UserList from './components/UserList';
import PokemonDashboard from './components/PokemonDashboard';
import styles from './App.module.css'; // Import CSS Module

export default function App() {
  const [tab, setTab] = useState('users'); // State untuk navigasi

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span>🚀</span> My API Projects
        </h1>
        <div className={styles.nav}>
          <button 
            className={tab === 'users' ? styles.activeBtn : styles.btn} 
            onClick={() => setTab('users')}
          >
            Manajemen User (Prak 1 & 2)
          </button>
          <button 
            className={tab === 'pokemon' ? styles.activeBtn : styles.btn} 
            onClick={() => setTab('pokemon')}
          >
            Pokedex Dashboard (PjBL)
          </button>
        </div>
      </header>

      <main className={styles.main}>
        {tab === 'users' ? (
          <UserList />
        ) : (
          <PokemonDashboard />
        )}
      </main>
    </div>
  );
}