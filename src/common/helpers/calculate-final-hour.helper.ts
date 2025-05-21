export const calculateFinalHour = (
  initialHour: string,
  revervationTime: number,
): string => {
  const [hours, minutes] = initialHour.split(':').map(Number);
  const initialDate = new Date();
  initialDate.setHours(hours, minutes, 0, 0);

  const finalDate = new Date(initialDate.getTime() + revervationTime * 60000);
  return `${finalDate.getHours().toString().padStart(2, '0')}:${finalDate.getMinutes().toString().padStart(2, '0')}`;
};
