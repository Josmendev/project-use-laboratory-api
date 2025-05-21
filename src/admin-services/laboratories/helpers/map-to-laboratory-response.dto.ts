import { LaboratoryDisponibilityResponseDto } from '../dto/laboratories-disponibility-response.dto';
import { ResultAvailableResponse } from '../interfaces/result-available-response.interface';

export const mapToLaboratoryResponse = (
  data: ResultAvailableResponse,
) => {
  // const result: LaboratoryDisponibilityResponseDto[] = [];

  // for (const slot of data.availableSlots) {
  //   const { initialHour, finalHour, laboratory } = slot;

  //   const existing = result.find(
  //     (lab) => lab.laboratoryId === laboratory.laboratoryId,
  //   );

  //   const timeSlot = { start: initialHour, end: finalHour };
  //   const slotResources =
  //     laboratory.equipment?.flatMap((eq) => eq.resources) || [];

  //   if (existing) {
  //     // Evitar duplicados de tiempo y recursos
  //     if (
  //       !existing.operationTime.some(
  //         (t) => t.start === timeSlot.start && t.end === timeSlot.end,
  //       )
  //     ) {
  //       existing.operationTime.push(timeSlot);
  //     }
  //     existing.resources.push(...slotResources);
  //   } else {
  //     result.push({
  //       laboratoryId: laboratory.laboratoryId,
  //       description: laboratory.description,
  //       operationTime: [timeSlot],
  //       resources: [...slotResources],
  //     });
  //   }
  // }

  // // Opcional: eliminar duplicados en resources
  // for (const res of result) {
  //   res.resources = [...new Set(res.resources)];
  // }

  // return result;
};
