import { PartialType } from '@nestjs/swagger';
import { CreateDocumentIdentityTypeDto } from './create-document-identity-type.dto';

export class UpdateDocumentIdentityTypeDto extends PartialType(CreateDocumentIdentityTypeDto) {}
