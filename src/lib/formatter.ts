export const formatCOP = (n: number) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency', currency: 'COP', minimumFractionDigits: 0
    }).format(n);
};

export const badgeLabel = (t: string) => t === 'suite' ? '🛁 Suite' : t === 'glamping' ? '⛺ Glamping' : '🏡 Cabaña';
export const jacuzziEmoji = (jac: string) => jac === 'cubierto' ? '🛁' : '♨️';

export const amenidadIcon = (amenidad: string) => {
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