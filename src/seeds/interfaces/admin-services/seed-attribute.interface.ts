import { AttributesType } from '../../../admin-services/attributes-type/entities/attributes-type.entity';

export interface SeedAttribute {
  attributeId: string;
  description: string;
  attributesType: AttributesType;
  isActive: boolean;
}
