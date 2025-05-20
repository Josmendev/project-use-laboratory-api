import { ServicesType } from '../../../admin-services/services-type/entities/services-type.entity';

export interface SeedService {
  serviceId: string;
  serviceType: ServicesType;
  description: string;
  isActive: boolean;
}
