export const GET_AVAILABLE_LABS_QUERY = `
  WITH UserSubscription AS (
      -- Verificar que el usuario tiene una suscripción activa
      SELECT
          s.subscriptionId,
          s.initialDate,
          s.finalDate,
          sd.subscriptionDetailId,
          sd.serviceServiceId
      FROM
          subscriber sub
      JOIN
          subscription s ON sub.subscriptionSubscriptionId = s.subscriptionId
      JOIN
          subscription_detail sd ON s.subscriptionId = sd.subscriptionSubscriptionId
      WHERE
          sub.subscriberId = ?  -- Parámetro: ID del usuario
          AND s.status = 'VIGENTE'
          AND CURRENT_DATE BETWEEN s.initialDate AND s.finalDate
  ),

  ProgrammingDetails AS (
      -- Obtener la programación asociada a la suscripción del usuario
      SELECT
          psd.programmingProgrammingId,
          psd.initialDate,
          psd.finalDate,
          psd.status,
          usd.serviceServiceId
      FROM
          programming_subscription_detail psd
      JOIN
          UserSubscription usd ON psd.subscriptionDetailSubscriptionDetailId = usd.subscriptionDetailId
      WHERE
          psd.status = 'VIGENTE'
          AND CURRENT_DATE BETWEEN psd.initialDate AND psd.finalDate
  ),

  AvailableDays AS (
      -- Obtener los días disponibles para la programación
      SELECT
          pd.programmingProgrammingId,
          d.dayId,
          d.description AS dayName
      FROM
          ProgrammingDetails pd
      JOIN
          programming_day pday ON pd.programmingProgrammingId = pday.programmingProgrammingId
      JOIN
          day d ON pday.dayDayId = d.dayId
      WHERE
          d.description = DAYNAME(?)  -- Parámetro: fecha de reserva
          AND d.isActive = 1
  ),

  AvailableHours AS (
      -- Obtener los horarios disponibles para los días
      SELECT
          ad.programmingProgrammingId,
          ad.dayId,
          ph.initialHour,
          ph.finalHour
      FROM
          AvailableDays ad
      JOIN
          programming_hours ph ON ad.programmingProgrammingId = ph.programmingDayProgrammingDayId
      WHERE
          ph.isActive = 1
          AND ? BETWEEN ph.initialHour AND ph.finalHour  -- Parámetro: hora inicial
          AND ADDTIME(?, SEC_TO_TIME(? * 60)) <= ph.finalHour  -- Parámetro: hora inicial, duración
  ),

  AvailableLabs AS (
      -- Obtener los laboratorios disponibles para el servicio
      SELECT
          l.laboratoryId,
          l.description AS labName,
          l.capacity,
          pd.serviceServiceId
      FROM
          laboratory l
      JOIN
          service s ON l.serviceServiceId = s.serviceId
      JOIN
          ProgrammingDetails pd ON s.serviceId = pd.serviceServiceId
      WHERE
          l.isActive = 1
  ),

  ReservationConflicts AS (
      -- Verificar conflictos de reserva
      SELECT
          rle.laboratoryEquipmentLaboratoryEquipeId,
          rle.reservationDate,
          rle.initialHour,
          rle.finalHour
      FROM
          reservation_laboratory_equipment rle
      WHERE
          rle.reservationDate = DATE(?)
          AND (
              (TIME(?) BETWEEN rle.initialHour AND rle.finalHour)
              OR
              (ADDTIME(TIME(?), SEC_TO_TIME(? * 60)) BETWEEN rle.initialHour AND rle.finalHour)
              OR
              (rle.initialHour BETWEEN TIME(?) AND ADDTIME(TIME(?), SEC_TO_TIME(? * 60)))
          )
          AND rle.status != 'CANCELADO'
  )

  -- Resultado final: laboratorios disponibles con sus horarios
  SELECT
      al.laboratoryId,
      al.labName,
      al.capacity,
      ah.initialHour AS availableFrom,
      ah.finalHour AS availableTo,
      le.laboratoryEquipeId AS equipmentId,
      e.description AS equipmentName,
      le.quantity AS availableEquipment
  FROM
      AvailableLabs al
  JOIN
      AvailableHours ah ON al.programmingProgrammingId = ah.programmingProgrammingId
  JOIN
      laboratory_equipment le ON al.laboratoryId = le.laboratory
  JOIN
      equipment e ON le.equipmentEquipmentId = e.equipmentId
  LEFT JOIN
      ReservationConflicts rc ON le.laboratoryEquipeId = rc.laboratoryEquipmentLaboratoryEquipeId
  WHERE
      rc.laboratoryEquipmentLaboratoryEquipeId IS NULL  -- Solo equipos sin conflictos
      AND le.quantity > 0  -- Solo equipos disponibles
      AND al.laboratoryId = COALESCE(?, al.laboratoryId)  -- Parámetro opcional: filtrar por laboratorio específico
  ORDER BY
      al.labName, ah.initialHour;
`;
