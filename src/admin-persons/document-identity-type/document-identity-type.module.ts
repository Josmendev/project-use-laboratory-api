import { Module } from '@nestjs/common';
import { DocumentIdentityTypeService } from './document-identity-type.service';
import { DocumentIdentityTypeController } from './document-identity-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentIdentityType } from './entities/document-identity-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentIdentityType])],
  controllers: [DocumentIdentityTypeController],
  providers: [DocumentIdentityTypeService],
})
export class DocumentIdentityTypeModule {}
