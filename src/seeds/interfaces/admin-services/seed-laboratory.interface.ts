import { Service } from '../../../admin-services/services/entities/service.entity';
import { ServicesType } from '../../../admin-services/services-type/entities/services-type.entity';

export interface SeedLaboratory {
  serviceId: string;
  serviceType: ServicesType;
  laboratoryId: string;
  description: string;
  service: Service;
  capacity: number;
  metadata: Record<string, any>;
  isActive: boolean;
}
