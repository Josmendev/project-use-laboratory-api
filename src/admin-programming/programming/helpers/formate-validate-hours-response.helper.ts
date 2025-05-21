export const formatValidateHoursResponse = (slot: any) => ({
  laboratoryId: slot.laboratory.laboratoryId,
  description: slot.laboratory.description,
  operationTime: [
    {
      start: slot.initialHour,
      end: slot.finalHour,
    },
  ],
  resources: slot.laboratory.equipment.flatMap((eq) => eq.resources),
});
