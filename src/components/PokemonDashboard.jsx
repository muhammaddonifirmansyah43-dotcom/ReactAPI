import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './PokemonDashboard.module.css';

export default function PokemonDashboard() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Menambah list tipe agar lebih lengkap sesuai data yang ditarik
  const types = ['all', 'grass', 'fire', 'water', 'bug', 'normal', 'poison', 'electric', 'ground', 'fairy', 'fighting', 'psychic'];

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // UPDATE: Limit dinaikkan ke 151 agar Pikachu (#25) dan Pokemon ikonik lainnya muncul
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        
        const detailedData = await Promise.all(
          res.data.results.map(async (p) => {
            const response = await axios.get(p.url);
            return response.data;
          })
        );
        
        setPokemon(detailedData);
      } catch (err) {
        setError("Gagal memuat data Pokemon. Periksa koneksi internetmu.");
        console.error("Error fetching Pokemon", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  // Logika filter gabungan antara Search bar dan Tombol Kategori
  const filtered = pokemon.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === 'all' || p.types.some(t => t.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  if (loading) return <div className={styles.loader}>Menangkap Pokemon ke dalam database... 🔍</div>;
  if (error) return <div className={styles.loader} style={{color: 'red'}}>{error}</div>;

  return (
    <div className={styles.container}>
      {/* 1. Search Bar */}
      <input 
        className={styles.search}
        placeholder="Cari nama Pokemon (contoh: Pikachu)..." 
        onChange={(e) => setSearch(e.target.value)} 
      />

      {/* 2. Filter Tipe */}
      <div className={styles.filterContainer}>
        {types.map(type => (
          <button 
            key={type}
            onClick={() => setSelectedType(type)}
            className={`${styles.filterBtn} ${selectedType === type ? styles.activeBtn : ''}`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 3. Grid Card */}
      <div className={styles.grid}>
        {filtered.length > 0 ? (
          filtered.map(p => (
            <div key={p.id} className={styles.card}>
              <div className={styles.idBadge}>#{p.id}</div>
              <img 
                src={p.sprites.other['official-artwork'].front_default} 
                alt={p.name} 
                className={styles.img} 
              />
              <h3 className={styles.pokemonName}>{p.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                {p.types.map(t => (
                  <span key={t.type.name} className={styles.badge}>
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '50px', color: '#718096'}}>
            <p style={{fontSize: '1.2rem'}}>⚠️ Pokemon tidak ditemukan...</p>
            <p>Coba ganti kategori atau kata kunci pencarianmu.</p>
          </div>
        )}
      </div>
    </div>
  );
}