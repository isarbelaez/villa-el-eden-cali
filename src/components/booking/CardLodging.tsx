import { badgeLabel, jacuzziEmoji, amenidadIcon, formatCOP } from "@lib/formatter";
import type { GalleryItem } from "../AlojamientosSectionReact"

interface Props {
    galleryItem: GalleryItem,
    idx: number
}

export default function CardLodging({ galleryItem, idx }: Props) {
    const base = import.meta.env.BASE_URL;

    return (
        <article
            key={galleryItem.id}
            data-aos="fade-up"
            data-aos-delay={(idx % 6) * 100}
            className="
                bg-white rounded-xl overflow-hidden flex flex-col
                border border-black/5
                shadow-[0_4px_15px_rgba(26,58,42,0.05)]
                hover:shadow-[0_20px_40px_rgba(26,58,42,0.12)]
                group
            "
        >
            <a href={`${base}/alojamiento/${galleryItem.id}`} className="block relative">

                {/* IMAGE */}
                <div className="relative h-[240px] overflow-hidden">
                    <img
                        src={galleryItem.imagen}
                        alt={galleryItem.nombre}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* BADGE */}
                    <div
                        className={`
                            absolute top-4 left-4 z-10
                            px-4 py-1 rounded
                            text-xs font-bold uppercase tracking-widest text-white
                            backdrop-blur-md border border-white/20
                            shadow-lg
                            ${galleryItem.tipo === 'suite' ? 'bg-[rgba(200,151,62,0.85)]' :
                                galleryItem.tipo === 'glamping' ? 'bg-[rgba(26,58,42,0.85)]' :
                                    'bg-[rgba(74,103,65,0.85)]'}
                        `}
                    >
                        {badgeLabel(galleryItem.tipo)}
                    </div>
                </div>
            </a>

            {/* BODY */}
            <div className="p-7 flex flex-col grow">

                {/* TOP */}
                <div className="flex justify-between items-start gap-4 mb-3">
                    <a
                        href={`${base}/alojamiento/${galleryItem.id}`}
                        className="no-underline text-forest group"
                    >
                        <h3 className="text-xl leading-tight transition-colors! group-hover:text-gold!">
                            {galleryItem.nombre}
                        </h3>
                    </a>

                    <div className="text-right flex flex-col leading-tight">
                        <strong className="text-lg font-bold text-forest">
                            {formatCOP(galleryItem.precio)}
                        </strong>

                        {galleryItem.precioMax && (
                            <span className="text-[11px] text-gray-400 font-medium">
                                hasta {formatCOP(galleryItem.precioMax)}
                            </span>
                        )}

                        <small className="text-xs text-gray-400 mt-0.5">
                            / noche
                        </small>
                    </div>
                </div>

                {/* SUMMARY */}
                {galleryItem.resumen && (
                    <p className="text-sm text-gray-600 leading-relaxed mb-5 grow">
                        {galleryItem.resumen}
                    </p>
                )}

                {/* META */}
                <div className="flex gap-3 mb-6 flex-wrap">
                    <span className="bg-[#f7f9f8] border border-[#e3e8e5] px-3 py-1 rounded text-xs font-semibold text-forest flex items-center gap-1">
                        👥 {galleryItem.capacidad} pax
                    </span>

                    <span className="bg-[#f7f9f8] border border-[#e3e8e5] px-3 py-1 rounded text-xs font-semibold text-forest flex items-center gap-1">
                        {jacuzziEmoji(galleryItem.jacuzzi)} Jacuzzi {galleryItem.jacuzzi}
                    </span>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">

                    {/* AMENITIES */}
                    <div className="flex gap-2 items-center">
                        {galleryItem.amenidades?.slice(0, 3).map((am, i) => (
                            <span
                                key={i}
                                title={am}
                                className="w-7 h-7 flex items-center justify-center rounded-full text-sm bg-mist text-forest"
                            >
                                {amenidadIcon(am)}
                            </span>
                        ))}

                        {galleryItem.amenidades && galleryItem.amenidades.length > 3 && (
                            <span className="text-xs font-semibold text-gray-400 ml-1">
                                +{galleryItem.amenidades.length - 3}
                            </span>
                        )}
                    </div>

                    {/* CTA */}
                    <a
                        href={`${base}/alojamiento/${galleryItem.id}`}
                        className="
                            text-gold font-bold text-sm uppercase tracking-wide
                            flex items-center transition-all! duration-300
                            hover:text-forest hover:pr-1
                        "
                    >
                        Ver detalles →
                    </a>
                </div>
            </div>
        </article>
    );
}