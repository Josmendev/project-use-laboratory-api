export const generateTimeSlots = (minutes: number): string[] => {
  const slots: string[] = [];
  const interval = 30; // Intervalo base de 30 minutos
  let currentMinutes = 0;

  // Siempre agregamos el primer intervalo de 30 minutos
  slots.push(formatTime(currentMinutes + interval));

  // Continuamos agregando intervalos hasta alcanzar o superar los minutos requeridos
  while (currentMinutes + interval < minutes) {
    currentMinutes += interval;
    slots.push(formatTime(currentMinutes + interval));
  }

  // Agregamos el tiempo exacto si no es múltiplo de 30
  if (minutes % interval !== 0 && currentMinutes + interval > minutes) {
    slots.push(formatTime(minutes));
  }

  return slots;
};

const formatTime = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};
