import { useEffect, useMemo, useState } from 'react';
import { Cake, CheckCircle2, ChevronRight, Mail, Music2, Plus, Send, Sparkles, UserRound, Users } from 'lucide-react';
import './App.css';

const STORAGE_KEY = 'charly-75-participantes';

const songs = [
  { title: 'Demoliendo hoteles', album: 'Clics modernos' },
  { title: 'No voy en tren', album: 'Parte de la religión' },
  { title: 'Cerca de la revolución', album: 'Piano bar' },
  { title: 'Los dinosaurios', album: 'Clics modernos' },
  { title: 'Rezo por vos', album: 'Parte de la religión' },
  { title: 'Promesas sobre el bidet', album: 'Clics modernos' },
  { title: 'Yendo de la cama al living', album: 'Yendo de la cama al living' },
  { title: 'Nos siguen pegando abajo', album: 'Clics modernos' },
  { title: 'Hablando a tu corazón', album: 'Tango 4' },
  { title: 'Piano bar', album: 'Piano bar' },
  { title: 'Rasguña las piedras', album: 'Confesiones de invierno' },
  { title: 'Seminare', album: 'Serú Girán' },
  { title: 'Inconsciente colectivo', album: 'Yendo de la cama al living' },
  { title: 'Ojos de videotape', album: 'Clics modernos' },
];

const emptyForm = { name: '', contact: '', song: '', customSong: '', note: '' };

function readParticipants() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export default function App() {
  const [form, setForm] = useState(emptyForm);
  const [participants, setParticipants] = useState(readParticipants);
  const [submitted, setSubmitted] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(participants));
  }, [participants]);

  const selectedSong = form.song === 'other' ? form.customSong.trim() : form.song;
  const canSubmit = form.name.trim() && form.contact.trim() && selectedSong;
  const participantCount = participants.length;
  const availableSongs = useMemo(() => songs.filter((song) => song.title !== form.song), [form.song]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) return;

    const newParticipant = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: form.name.trim(),
      contact: form.contact.trim(),
      song: selectedSong,
      note: form.note.trim(),
    };

    setParticipants((current) => [newParticipant, ...current]);
    setForm(emptyForm);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Charly 75 inicio">
          <span className="brand-mark"><Music2 size={19} /></span>
          <span>Charly <strong>75</strong></span>
        </a>
        <a className="header-link" href="#participar">Sumate <ChevronRight size={16} /></a>
      </header>

      <main id="inicio">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles size={15} /> Homenaje colectivo</p>
            <h1>Una canción.<br /><em>Una celebración.</em></h1>
            <p className="hero-text">
              Estamos preparando un show especial para celebrar los 75 años de Charly.
              Elegí una canción para participar o proponé la que no puede faltar.
            </p>
            <a className="primary-link" href="#participar">Quiero participar <ChevronRight size={17} /></a>
          </div>
          <div className="hero-art" aria-label="Ilustración musical" role="img">
            <span className="art-number">75</span>
            <span className="art-note note-one">♪</span>
            <span className="art-note note-two">♫</span>
            <div className="art-disc" />
            <div className="art-line line-one" />
            <div className="art-line line-two" />
          </div>
        </section>

        <section className="intro-strip">
          <div><Cake size={20} /><span>Celebramos una vida entera de canciones</span></div>
          <div><Users size={20} /><span>Queremos saber quiénes se suman</span></div>
        </section>

        <section className="form-section" id="participar">
          <div className="section-heading">
            <p className="eyebrow">Tu lugar en el show</p>
            <h2>Contanos cómo querés participar</h2>
            <p>Completá tus datos y elegí la canción que te gustaría tocar, cantar o compartir.</p>
          </div>

          {submitted && (
            <div className="success-message" role="status">
              <CheckCircle2 size={22} />
              <div><strong>¡Gracias por sumarte!</strong><span>Ya registramos tu propuesta para el homenaje.</span></div>
            </div>
          )}

          <form className="participation-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                <span><UserRound size={15} /> Nombre y apellido</span>
                <input name="name" value={form.name} onChange={handleChange} placeholder="¿Cómo te llamás?" required />
              </label>
              <label>
                <span><Mail size={15} /> Mail o WhatsApp</span>
                <input name="contact" value={form.contact} onChange={handleChange} placeholder="¿Cómo te contactamos?" required />
              </label>
            </div>

            <fieldset>
              <legend><Music2 size={16} /> Elegí una canción</legend>
              <div className="song-list">
                {availableSongs.map((song) => (
                  <label className={`song-option ${form.song === song.title ? 'selected' : ''}`} key={song.title}>
                    <input type="radio" name="song" value={song.title} checked={form.song === song.title} onChange={handleChange} />
                    <span className="radio-dot" />
                    <span className="song-info"><strong>{song.title}</strong><small>{song.album}</small></span>
                  </label>
                ))}
                <label className={`song-option custom-option ${form.song === 'other' ? 'selected' : ''}`}>
                  <input type="radio" name="song" value="other" checked={form.song === 'other'} onChange={handleChange} />
                  <span className="radio-dot"><Plus size={14} /></span>
                  <span className="song-info"><strong>Quiero sumar otra canción</strong><small>La que vos quieras proponer</small></span>
                </label>
              </div>
            </fieldset>

            {form.song === 'other' && (
              <label className="custom-song-field">
                <span>¿Qué canción proponés?</span>
                <input name="customSong" value={form.customSong} onChange={handleChange} placeholder="Nombre de la canción" required />
              </label>
            )}

            <label>
              <span>¿Querés contarnos algo más? <small>(opcional)</small></span>
              <textarea name="note" value={form.note} onChange={handleChange} placeholder="Instrumento, idea para la canción, mensaje..." rows="3" />
            </label>

            <div className="form-footer">
              <p>Tu respuesta nos ayuda a armar el repertorio y contactarte con los detalles.</p>
              <button className="submit-button" type="submit" disabled={!canSubmit}><Send size={17} /> Anotarme</button>
            </div>
          </form>
        </section>

        <section className="participants-section">
          <button className="participants-toggle" type="button" onClick={() => setShowParticipants((value) => !value)}>
            <span><Users size={19} /> Ya somos <strong>{participantCount}</strong> participante{participantCount === 1 ? '' : 's'}</span>
            <ChevronRight className={showParticipants ? 'rotated' : ''} size={18} />
          </button>
          {showParticipants && (
            <div className="participants-list">
              {participants.length === 0 ? <p className="empty-state">Todavía no hay participantes registrados.</p> : participants.map((participant) => (
                <div className="participant-row" key={participant.id}><strong>{participant.name}</strong><span>{participant.song}</span></div>
              ))}
              <p className="storage-note">En esta versión de demo, las respuestas se guardan en este navegador.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer"><span>Charly 75</span><span>Una celebración hecha entre todos</span></footer>
    </div>
  );
}
