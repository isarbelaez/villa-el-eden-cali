import React, { useState, useMemo, useEffect } from 'react';
import './AlojamientosSectionReact.css';

export interface GalleryItem {
	id: string;
	nombre: string;
	imagen: string;
	precio: number;
	jacuzzi: string;
	tipo: string;
	capacidad: number;
	resumen?: string;
	amenidades?: string[];
}

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

	const formatCOP = (n: number) => {
		return new Intl.NumberFormat('es-CO', {
			style: 'currency', currency: 'COP', minimumFractionDigits: 0
		}).format(n);
	};

	const badgeLabel = (t: string) => t === 'suite' ? '🛁 Suite' : t === 'glamping' ? '⛺ Glamping' : '🏡 Cabaña';
	const jacuzziEmoji = (jac: string) => jac === 'cubierto' ? '🛁' : '♨️';

	const amenidadIcon = (amenidad: string) => {
		const lower = amenidad.toLowerCase();
		if (lower.includes('jacuzzi')) return '🛁';
		if (lower.includes('cama')) return '🛏️';
		if (lower.includes('tv') || lower.includes('smart')) return '📺';
		if (lower.includes('wifi')) return '📶';
		if (lower.includes('cafetera')) return '☕';
		if (lower.includes('nevera')) return '🧊';
		if (lower.includes('red') || lower.includes('catamarán')) return '🌙';
		if (lower.includes('baño')) return '🚿';
		if (lower.includes('comedor') || lower.includes('cocina')) return '🍽️';
		if (lower.includes('jardín') || lower.includes('deck')) return '🌿';
		if (lower.includes('audio')) return '🎵';
		return '✅';
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
						<div className="lux-grid">
							{displayedItems.map((a, idx) => {
								return (
									<article className="lux-card" key={a.id} data-aos="fade-up" data-aos-delay={(idx % 6) * 100}>
										<a href={`/ejemplo-villa-eucalipto-y-romero-glamping/alojamiento/${a.id}`} className="lux-card-img-link">
											<div className="lux-card-img-wrapper">
												<img src={a.imagen} alt={a.nombre} loading="lazy" />
												<div className={`lux-badge lux-badge-${a.tipo}`}>{badgeLabel(a.tipo)}</div>
											</div>
										</a>
										
										<div className="lux-card-body">
											<div className="lux-card-top">
												<a href={`/ejemplo-villa-eucalipto-y-romero-glamping/alojamiento/${a.id}`} className="lux-card-title">
													<h3>{a.nombre}</h3>
												</a>
												<div className="lux-card-price">
													<strong>{formatCOP(a.precio)}</strong>
													<small>/ noche</small>
												</div>
											</div>

											{a.resumen && <p className="lux-card-summary">{a.resumen}</p>}

											<div className="lux-card-meta">
												<span className="lux-meta-pill">
													<span className="lux-icon">👥</span> {a.capacidad} pax
												</span>
												<span className="lux-meta-pill">
													<span className="lux-icon">{jacuzziEmoji(a.jacuzzi)}</span> Jacuzzi {a.jacuzzi}
												</span>
											</div>

											<div className="lux-card-bottom">
												<div className="lux-card-amenities">
													{a.amenidades?.slice(0, 3).map((am, i) => (
														<span key={i} title={am} className="lux-amenity-icon">
															{amenidadIcon(am)}
														</span>
													))}
													{a.amenidades && a.amenidades.length > 3 && (
														<span className="lux-amenity-more">+{a.amenidades.length - 3}</span>
													)}
												</div>
												
												<a href={`/ejemplo-villa-eucalipto-y-romero-glamping/alojamiento/${a.id}`} className="lux-btn-reserve">
													Ver detalles →
												</a>
											</div>
										</div>
									</article>
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
