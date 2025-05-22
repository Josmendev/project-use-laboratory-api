export const generateTimeSlots = (totalDurationMinutes: number): string[] => {
  const slots: string[] = [];
  const interval = 30; // Intervalo en minutos

  let currentTime = 0; // Representa los minutos actuales en la iteración

  // Generar slots cada 'interval' minutos hasta alcanzar o superar la duración total
  while (currentTime < totalDurationMinutes) {
    currentTime += interval;
    if (currentTime <= totalDurationMinutes) {
      slots.push(formatTime(currentTime));
    }
  }
  const lastSlotMinutes =
    slots.length > 0
      ? parseInt(slots[slots.length - 1].substring(0, 2)) * 60 +
        parseInt(slots[slots.length - 1].substring(3, 5))
      : 0;

  if (
    totalDurationMinutes % interval !== 0 &&
    totalDurationMinutes > lastSlotMinutes
  ) {
    slots.push(formatTime(totalDurationMinutes));
  } else if (
    totalDurationMinutes % interval === 0 &&
    lastSlotMinutes === totalDurationMinutes &&
    !slots.includes(formatTime(totalDurationMinutes))
  ) {
    slots.push(formatTime(totalDurationMinutes));
  }

  return slots;
};

const formatTime = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};
