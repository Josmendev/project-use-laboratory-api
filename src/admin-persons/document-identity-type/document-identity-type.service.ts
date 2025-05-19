import { Injectable } from '@nestjs/common';
import { CreateDocumentIdentityTypeDto } from './dto/create-document-identity-type.dto';
import { UpdateDocumentIdentityTypeDto } from './dto/update-document-identity-type.dto';

@Injectable()
export class DocumentIdentityTypeService {
  create(createDocumentIdentityTypeDto: CreateDocumentIdentityTypeDto) {
    return 'This action adds a new documentIdentityType';
  }

  findAll() {
    return `This action returns all documentIdentityType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documentIdentityType`;
  }

  update(id: number, updateDocumentIdentityTypeDto: UpdateDocumentIdentityTypeDto) {
    return `This action updates a #${id} documentIdentityType`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentIdentityType`;
  }
}
