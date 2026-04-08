import React, { useState, useMemo, useEffect } from 'react';
import './AlojamientosSectionReact.css';
import CardLodging from './booking/CardLodging.tsx';
import type { Alojamiento } from "../content.config.ts";

export type GalleryItem = Omit<Alojamiento, 'destacada' | 'galeria' | 'orden'> & {
	id: string;
};

interface Props {
	alojamientos: GalleryItem[];
	pageSize?: number;
}

export default function AlojamientosReact({ alojamientos, pageSize = 6 }: Props) {
	const [tipo, setTipo] = useState('');
	const [jacuzzi, setJacuzzi] = useState('');
	const [precio, setPrecio] = useState('');
	const [currentPage, setCurrentPage] = useState(0);

	// Filtering
	const filtered = useMemo(() => {
		return alojamientos.filter(a => {
			const matchesTipo = !tipo || a.tipo === tipo;
			const matchesJacuzzi = !jacuzzi || a.jacuzzi === jacuzzi;
			const matchesPrecio = !precio || String(a.precio) === precio;
			return matchesTipo && matchesJacuzzi && matchesPrecio;
		});
	}, [alojamientos, tipo, jacuzzi, precio]);

	// Pagination resets on filter change
	useEffect(() => {
		setCurrentPage(0);
	}, [tipo, jacuzzi, precio]);

	const totalPages = Math.ceil(filtered.length / pageSize);
	const displayedItems = filtered.slice(currentPage * pageSize, currentPage * pageSize + pageSize);

	const handleSearch = () => {
		// In pure React, the filters update instantly as you change the select. 
		// But a user might like a "Buscar" button. Since the filter is real-time via state,
		// the button is mainly cosmetic, but we can animate a scroll down.
		document.getElementById('galeria-alojamientos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	return (
		<>
			{/* SEARCH BAR WIDGET */}
			<div className="react-search-bar-wrapper">
				<div className="react-search-bar">
					<div className="search-field">
						<label htmlFor="search-tipo">🏡 Tipo de alojamiento</label>
						<select id="search-tipo" value={tipo} onChange={e => setTipo(e.target.value)}>
							<option value="">Todos</option>
							<option value="suite">Suite</option>
							<option value="glamping">Glamping</option>
							<option value="cabana">Cabaña</option>
						</select>
					</div>
					<div className="search-divider" aria-hidden="true" />
					<div className="search-field">
						<label htmlFor="search-jacuzzi">♨️ Jacuzzi</label>
						<select id="search-jacuzzi" value={jacuzzi} onChange={e => setJacuzzi(e.target.value)}>
							<option value="">Cualquiera</option>
							<option value="cubierto">Cubierto</option>
							<option value="al aire libre">Al aire libre</option>
						</select>
					</div>
					<div className="search-divider" aria-hidden="true" />
					<div className="search-field">
						<label htmlFor="search-precio">💰 Precio</label>
						<select id="search-precio" value={precio} onChange={e => setPrecio(e.target.value)}>
							<option value="">Todos</option>
							<option value="480000">$480.000</option>
							<option value="496000">$496.000</option>
						</select>
					</div>
					<button className="search-btn" onClick={handleSearch} aria-label="Filtrar alojamientos">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
						<span>Buscar</span>
					</button>
				</div>
			</div>

			{/* GALLERY SECTION */}
			<section className="lux-gallery-section" id="galeria-alojamientos">
				<div className="container">
					<div className="gallery-header" data-aos="fade-up">
						<h2>Alojamientos Especiales</h2>
						<p>Descubre nuestros refugios de lujo en la naturaleza y encuentra el espacio perfecto para tu próxima escapada de relajación profunda.</p>
					</div>

					{/* CARDS LISTING */}
					{filtered.length === 0 ? (
						<div className="no-results-box">
							<span>🍃</span>
							<h3>No hay alojamientos con estos filtros</h3>
							<p>Intenta quitando algunas opciones de búsqueda.</p>
							<button onClick={() => { setTipo(''); setJacuzzi(''); setPrecio(''); }}>Borrar Filtros</button>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
							{displayedItems.map((a, idx) => {
								return (
									<CardLodging galleryItem={a} idx={idx} key={a.id} />
								);
							})}
						</div>
					)}

					{/* PAGINATION */}
					{totalPages > 1 && (
						<div className="react-pagination">
							<button
								className="pg-arrow"
								disabled={currentPage === 0}
								onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
							>
								← Anterior
							</button>
							<div className="pg-dots">
								{Array.from({ length: totalPages }).map((_, i) => (
									<button
										key={i}
										className={`pg-dot ${i === currentPage ? 'active' : ''}`}
										onClick={() => setCurrentPage(i)}
										aria-label={`Ir a página ${i + 1}`}
									/>
								))}
							</div>
							<button
								className="pg-arrow"
								disabled={currentPage >= totalPages - 1}
								onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
							>
								Siguiente →
							</button>
						</div>
					)}
				</div>
			</section>
		</>
	);
}
