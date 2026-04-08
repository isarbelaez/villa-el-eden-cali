import React, { useState, useEffect } from 'react';
import './ReservationForm.css';

const ALOJAMIENTOS = [
  'Suite Guayacán',
  'Suite Entrepinos',
  'Suite Cañabrava',
  'Glamping Carbonero',
  'Glamping Bonsái',
  'Cabaña Romero',
];

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    accommodation: 'Suite Guayacán',
    date: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill accommodation from URL param (when coming from gallery card)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const aloj = params.get('alojamiento');
    if (aloj && ALOJAMIENTOS.includes(aloj)) {
      setFormData(prev => ({ ...prev, accommodation: aloj }));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const msg = `Hola Villa del Eden 🌿\n\nQuiero hacer una reserva:\n- Alojamiento: ${formData.accommodation}\n- Fecha de ingreso: ${formData.date}\n- Nombre: ${formData.name}\n- Teléfono: ${formData.phone}\n- Email: ${formData.email}\n\nRealizo el abono de $100.000 COP para confirmar.`;
    const url = `https://wa.me/573000000000?text=${encodeURIComponent(msg)}`;
    setTimeout(() => window.open(url, '_blank'), 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="reservation-success">
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
        <h3>¡Reserva iniciada!</h3>
        <p>Te redirigimos a WhatsApp para confirmar tu abono y datos.</p>
      </div>
    );
  }

  return (
    <form className="reservation-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">Nombre Completo *</label>
        <input
          type="text" id="name" name="name" required
          placeholder="Tu nombre completo"
          value={formData.name} onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico *</label>
          <input
            type="email" id="email" name="email" required
            placeholder="tucorreo@gmail.com"
            value={formData.email} onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">WhatsApp / Teléfono *</label>
          <input
            type="tel" id="phone" name="phone" required
            placeholder="+57 300 0000000"
            value={formData.phone} onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="accommodation">Alojamiento de interés *</label>
        <select id="accommodation" name="accommodation" value={formData.accommodation} onChange={handleChange}>
          {ALOJAMIENTOS.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Fecha de Ingreso *</label>
        <input
          type="date" id="date" name="date" required
          value={formData.date} onChange={handleChange}
        />
      </div>

      <div className="reservation-notice">
        <strong>💳 Proceso de pago:</strong> Abono de <strong>$100.000 COP</strong> para confirmar tu reserva. El saldo restante lo cancelas en La Villa en <strong>EFECTIVO</strong>, o puedes ir abonando antes de la fecha.
      </div>

      <button type="submit" className="submit-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
        Reservar por WhatsApp
      </button>
    </form>
  );
}
