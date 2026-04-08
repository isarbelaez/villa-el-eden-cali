import { useState, useEffect } from "react";
import { buildWhatsAppURL } from "@/lib/whatsapp";
import { buildReservationMessage } from "@/lib/format";

type Props = {
  alojamientos: string[];
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  accommodation: string;
  date: string;
};

export default function ReservationForm({ alojamientos }: Props) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    accommodation: alojamientos[0] || "",
    date: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const aloj = params.get("alojamiento");

    if (aloj && alojamientos.includes(aloj)) {
      setFormData((prev) => ({ ...prev, accommodation: aloj }));
    }
  }, [alojamientos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = buildReservationMessage(formData);
    const url = buildWhatsAppURL("573214610792", message);

    setTimeout(() => window.open(url, "_blank"), 1200);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-10 text-center">
        <h3 className="text-2xl font-semibold mb-2">¡Reserva iniciada!</h3>
        <p className="text-gray-600">
          Te redirigimos a WhatsApp para confirmar tu abono y datos.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6"
    >
      {/* Nombre */}
      <div className="space-y-1">
        <label className="font-semibold text-gray-800">
          Nombre Completo *
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="Tu nombre completo"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none"
        />
      </div>

      {/* Email + Phone */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="font-semibold text-gray-800">
            Correo Electrónico *
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="tucorreo@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-gray-800">
            WhatsApp / Teléfono *
          </label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="+57 300 0000000"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none"
          />
        </div>
      </div>

      {/* Alojamiento */}
      <div className="space-y-1">
        <label className="font-semibold text-gray-800">
          Alojamiento de interés *
        </label>
        <select
          name="accommodation"
          value={formData.accommodation}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none"
        >
          {alojamientos.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      {/* Fecha */}
      <div className="space-y-1">
        <label className="font-semibold text-gray-800">
          Fecha de Ingreso *
        </label>
        <input
          type="date"
          name="date"
          required
          value={formData.date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none"
        />
      </div>

      {/* Notice */}
      <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-md text-sm text-gray-700">
        <strong>💳 Proceso de pago:</strong> Abono de{" "}
        <strong>$100.000 COP</strong> para confirmar tu reserva. El saldo restante lo cancelas en <strong>EFECTIVO</strong>.
      </div>

      {/* Button */}
      <button
        type="submit"
        className="cursor-pointer w-full bg-green-800 hover:bg-green-600 transition text-white py-3 rounded-md font-semibold tracking-wide"
      >
        Reservar por WhatsApp
      </button>
    </form>
  );
}