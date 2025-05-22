export const buildLabReservationEmail = (params: {
  companyName: string;
  logoUrl: string;
  userName: string;
  reservationDate: string;
  details: Array<{
    // <- Array de detalles (mapeo)
    labDescription: string;
    equipmentDescription: string;
    startTime: string;
    endTime: string;
    date: string;
  }>;
  primaryColor: string;
}): string => {
  // Mapeamos cada detalle de reserva
  const detailsHtml = params.details
    .map(
      (detail) => `
    <div style="
      margin-bottom: 15px;
      padding: 12px;
      border-left: 4px solid ${params.primaryColor};
      background: #f8f9fa;
    ">
      <h3 style="margin: 0 0 5px 0; color: ${params.primaryColor};">${detail.labDescription}</h3>
      <p><strong>Equipo:</strong> ${detail.equipmentDescription}</p>
      <p><strong>Fecha:</strong> ${detail.date}</p>
      <p><strong>Horario:</strong> ${detail.startTime} - ${detail.endTime}</p>
    </div>
  `,
    )
    .join(''); // Convertimos el array en un solo string HTML

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <!-- Encabezado -->
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${params.logoUrl}" alt="${params.companyName}" style="max-width: 200px;">
        <h1 style="color: ${params.primaryColor};">Confirmación de Reserva</h1>
      </div>

      <!-- Saludo -->
      <p>Hola <strong>${params.userName}</strong>,</p>
      <p>Tu reserva en <strong>${params.companyName}</strong> realizada el día el <strong>${params.reservationDate}</strong> ha sido confirmada :</p>

      <!-- Aquí se inyectan los detalles MAPEADOS -->
      ${detailsHtml}

      <!-- Pie -->
      <div style="margin-top: 25px; padding-top: 10px; border-top: 1px solid #ddd; font-size: 12px; color: #777;">
        <p>© ${new Date().getFullYear()} ${params.companyName}</p>
      </div>
    </div>
  `;
};
