import { Controller } from '@nestjs/common';
import { DocumentIdentityTypeService } from './document-identity-type.service';

@Controller('document-identity-type')
export class DocumentIdentityTypeController {
  constructor(
    private readonly documentIdentityTypeService: DocumentIdentityTypeService,
  ) {}
}
