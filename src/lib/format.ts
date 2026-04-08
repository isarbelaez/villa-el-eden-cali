type FormData = {
  name: string;
  email: string;
  phone: string;
  accommodation: string;
  date: string;
};

export const buildReservationMessage = (data: FormData) => {
  return [
    "Hola Villa del Eden 🌿",
    "",
    "Quiero hacer una reserva:",
    "",
    `- Alojamiento: ${data.accommodation}`,
    `- Fecha de ingreso: ${data.date}`,
    `- Nombre: ${data.name}`,
    `- Teléfono: ${data.phone}`,
    `- Email: ${data.email}`,
  ].join("\n");
};