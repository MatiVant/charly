import { Cake, ChevronRight, Music2, Sparkles, Users } from 'lucide-react';
import './App.css';

const GOOGLE_FORM_URL = 'https://forms.gle/oADA7KuiyyzvgoBo7';
const GOOGLE_FORM_EMBED_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSedyIXCzaGiEQgxhmfycO5DQqWleoTDhhtwKkAeO7PY-cs0dg/viewform?embedded=true';

const songs = [
  { title: 'Demoliendo hoteles', album: 'Clics modernos' },
  { title: 'No voy en tren', album: 'Parte de la religión' },
  { title: 'Cerca de la revolución', album: 'Piano bar' },
  { title: 'Los dinosaurios', album: 'Clics modernos' },
  { title: 'Rezo por vos', album: 'Parte de la religión' },
  { title: 'Yendo de la cama al living', album: 'Yendo de la cama al living' },
  { title: 'Nos siguen pegando abajo', album: 'Clics modernos' },
  { title: 'Hablando a tu corazón', album: 'Tango 4' },
  { title: 'Piano bar', album: 'Piano bar' },
  { title: 'Rasguña las piedras', album: 'Confesiones de invierno' },
  { title: 'Seminare', album: 'Serú Girán' },
  { title: 'Ojos de videotape', album: 'Clics modernos' },
  { title: 'Viernes 3 AM', album: 'La grasa de las capitales' },
  { title: 'Eiti Leda', album: 'Bicicleta' },
  { title: 'Canción de Alicia en el país', album: 'Bicicleta' },
  { title: 'Peperina', album: 'Peperina' },
  { title: 'El fantasma de Canterville', album: 'PorSuiGieco' },
  { title: 'Mariel y el capitán', album: 'Peperina' },
  { title: 'Instituciones', album: 'Instituciones' },
  { title: 'No soy un extraño', album: 'Clics modernos' },
  { title: 'Parte de la religión', album: 'Parte de la religión' },
  { title: 'No me dejan salir', album: 'Clics modernos' },
  { title: 'Chipi chipi', album: 'Cassandra Lange' },
  { title: 'Influencia', album: 'Influencia' },
  { title: 'A los jóvenes de ayer', album: 'Peperina' },
  { title: 'Tu amor', album: 'Tango 4' },
];

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Charly 75 inicio">
          <span className="brand-mark"><Music2 size={19} /></span>
          <span>Charly <strong>75</strong></span>
        </a>
        <a className="header-link" href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer">Anotate <ChevronRight size={16} /></a>
      </header>

      <main id="inicio">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles size={15} /> Puerto Limón</p>
            <h1>No digas nada,<br /><em>Charly cumple 75</em></h1>
            <p className="hero-text">Festejamos los 75 años de Charly en Puerto Limón.</p>
            <a className="primary-link" href="#participar">Ver canciones <ChevronRight size={17} /></a>
          </div>
          <div className="hero-art-wrap">
            <img className="hero-art" src="/charly.png" alt="Flyer del homenaje a Charly por sus 75 años" />
          </div>
        </section>

        <section className="intro-strip">
          <div><Cake size={20} /><span>Charly cumple 75</span></div>
          <div><Users size={20} /><span>Festejamos en Puerto Limón</span></div>
        </section>

        <section className="form-section" id="participar">
          <div className="section-heading">
            <p className="eyebrow">Canciones disponibles</p>
            <h2>¿Sabés alguna de estas? Anotate.</h2>
            <p>Son canciones posibles para el homenaje, no un repertorio confirmado. Si conocés alguna y querés participar, completá el formulario.</p>
          </div>

          <div className="song-list simple-song-list" aria-label="Lista de canciones disponibles">
            {songs.map((song) => (
              <div className="song-line" key={song.title}>
                <span><strong>{song.title}</strong><small>{song.album}</small></span>
              </div>
            ))}
          </div>

          <div className="embedded-form-section">
            <div className="form-heading">
              <p className="eyebrow">Sumate al homenaje</p>
              <h3>Completá tus datos</h3>
              <p>Elegí cómo querés participar y dejanos tu propuesta en este formulario.</p>
            </div>
            <iframe
              className="google-form"
              src={GOOGLE_FORM_EMBED_URL}
              title="Formulario para participar del homenaje a Charly"
              loading="lazy"
            >
              Cargando formulario...
            </iframe>
          </div>
        </section>
      </main>

      <footer className="site-footer"><span>Charly 75</span><span>Festejo en Puerto Limón</span></footer>
    </div>
  );
}
