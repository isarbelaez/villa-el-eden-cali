import CTAButton from "@ui/CTAButton";

type Props = {
    precio: number;
    precioMax?: number;
    capacidad: number;
    nombre: string;
};

const formatCOP = (n: number) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(n);
};

export default function BookingSidebar({ precio, precioMax, capacidad, nombre }: Props) {
    const base = import.meta.env.BASE_URL;

    return (
        <aside className="lg:sticky lg:top-[100px] -order-1 lg:order-0">
            <div
                data-aos="fade-left"
                className="
                    bg-white rounded-2xl overflow-hidden
                    border border-mist
                    shadow-[0_10px_40px_rgba(26,58,42,0.1)]
                "
            >
                {/* HEADER */}
                <div className="bg-forest text-white text-center p-8">
                    <div className="text-4xl font-bold leading-tight mb-1 font-display">
                        {formatCOP(precio)}
                    </div>

                    {precioMax != null && (
                        <div className="text-xs text-white/70 font-medium tracking-wide">
                            hasta {formatCOP(precioMax)}
                        </div>
                    )}

                    <div className="text-sm text-white/80 mt-1">
                        / noche · {capacidad} personas
                    </div>
                </div>

                {/* BODY */}
                <div className="p-8">
                    <p className="text-center text-sm text-gray-600 mb-6">
                        Reserva tu estadía con un abono de $100.000 COP y paga
                        el resto al llegar.
                    </p>

                    <CTAButton
                        text="Ir a Reservar"
                        href={`${import.meta.env.BASE_URL}/reservas?alojamiento=${encodeURIComponent(nombre)}`}
                    />

                    {/* FEATURES */}
                    <ul className="border-t border-mist pt-6 space-y-3 mt-6">
                        <li className="flex items-center text-[0.9rem] font-semibold text-sage">
                            ✓ Desayuno y cena incluidos
                        </li>
                        <li className="flex items-center text-[0.9rem] font-semibold text-sage">
                            ✓ Parqueadero privado
                        </li>
                        <li className="flex items-center text-[0.9rem] font-semibold text-sage">
                            ✓ Recepción 24h
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
}