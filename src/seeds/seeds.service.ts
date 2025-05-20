import { Injectable } from '@nestjs/common';
import { initialData } from './data/seed.data';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonsType } from '../admin-persons/persons-type/entities/persons-type.entity';
import { Repository } from 'typeorm';
import { NaturalPerson } from '../admin-persons/natural-persons/entities/natural-person.entity';
import { JuridicalPerson } from '../admin-persons/juridical-persons/entities/juridical-person.entity';
import { Person } from '../admin-persons/persons/entities/person.entity';
import { SubscriptionsType } from '../admin-subscriptions/subscriptions-type/entities/subscriptions-type.entity';
import { DocumentIdentityType } from '../admin-persons/document-identity-type/entities/document-identity-type.entity';
import { ServicesType } from '../admin-services/services-type/entities/services-type.entity';
import { Service } from '../admin-services/services/entities/service.entity';

@Injectable()
export class SeedsService {
  constructor(
    @InjectRepository(PersonsType)
    private readonly personTypeRepository: Repository<PersonsType>,
    @InjectRepository(DocumentIdentityType)
    private readonly documentIdentityTypeRepository: Repository<DocumentIdentityType>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(JuridicalPerson)
    private readonly juridicalPersonRepository: Repository<JuridicalPerson>,
    @InjectRepository(NaturalPerson)
    private readonly naturalPersonRepository: Repository<NaturalPerson>,
    @InjectRepository(SubscriptionsType)
    private readonly subscriptionsTypeRepository: Repository<SubscriptionsType>,
    @InjectRepository(ServicesType)
    private readonly servicesTypeRepository: Repository<ServicesType>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async runSeed(): Promise<string> {
    await this.deleteAllTables();
    /** register persons */
    await this.insertPersonType();
    await this.insertDocumentIdentityType();
    await this.inserNaturalPerson();
    await this.inserJuridicalPerson();
    // // /** register subcriptions */
    await this.insertSubscriptionsType();
    await this.insertServicesType();
    await this.insertServices();

    return 'Seed ejecutado con éxito';
  }

  private async insertPersonType(): Promise<boolean> {
    const insertPromises: Promise<PersonsType>[] = [];
    initialData.personTypes.forEach((pType) => {
      insertPromises.push(this.personTypeRepository.save(pType));
    });
    await Promise.all(insertPromises);
    console.log('personType insertados');
    return true;
  }

  private async insertDocumentIdentityType(): Promise<boolean> {
    const insertPromises: Promise<DocumentIdentityType>[] = [];
    initialData.documentIdentityType.forEach((dType) => {
      insertPromises.push(this.documentIdentityTypeRepository.save(dType));
    });
    await Promise.all(insertPromises);
    console.log('documentIdentityType insertados');
    return true;
  }

  private async inserJuridicalPerson(): Promise<boolean> {
    const insertPromises: Promise<JuridicalPerson>[] = [];

    for (const nPersonData of initialData.juridicalPersons) {
      const personType = await this.personTypeRepository.findOneBy({
        personTypeId: 'ab41d0c4-8626-4ffc-8e40-4fbeb309773e',
      });
      if (!personType) {
        throw new Error(`No se encontró el tipo persona juridica`);
      }
      const documentIdentityType =
        await this.documentIdentityTypeRepository.findOneBy({
          documentIdentityTypeId: '05e6f7g8-5678-9012-34ef-ghij45678901',
        });
      if (!documentIdentityType) {
        throw new Error(`Registro Único De Contribuyentes`);
      }

      nPersonData.personType = personType;
      nPersonData.documentIdentityType = documentIdentityType;

      const promise = this.personRepository
        .save(nPersonData)
        .then(async (savedPerson) => {
          nPersonData.person = savedPerson;
          const naturalPerson =
            this.juridicalPersonRepository.create(nPersonData);
          return this.juridicalPersonRepository.save(naturalPerson);
        });

      insertPromises.push(promise);
    }

    await Promise.all(insertPromises);
    console.log('Juridical Persons insertados correctamente');
    return true;
  }

  private async inserNaturalPerson(): Promise<boolean> {
    const insertPromises: Promise<NaturalPerson>[] = [];

    for (const nPersonData of initialData.naturalPersons) {
      const personType = await this.personTypeRepository.findOneBy({
        personTypeId: '760f6b8c-96b0-4ca7-abea-547ec8219a98',
      });
      if (!personType) {
        throw new Error(`No se encontró el tipo persona natural`);
      }
      const documentIdentityType =
        await this.documentIdentityTypeRepository.findOneBy({
          documentIdentityTypeId: '01a2b3c4-1234-5678-90ab-cdef01234567',
        });
      if (!documentIdentityType) {
        throw new Error(`No se encontró el tipo de documento de identidad`);
      }

      nPersonData.personType = personType;
      nPersonData.documentIdentityType = documentIdentityType;

      const promise = this.personRepository
        .save(nPersonData)
        .then(async (savedPerson) => {
          nPersonData.person = savedPerson;
          const naturalPerson =
            this.naturalPersonRepository.create(nPersonData);
          return this.naturalPersonRepository.save(naturalPerson);
        });

      insertPromises.push(promise);
    }

    await Promise.all(insertPromises);
    console.log('NaturalPersons insertados correctamente');
    return true;
  }

  private async inserJuridicalPerson_(): Promise<boolean> {
    const insertPromises: Promise<JuridicalPerson>[] = [];
    initialData.juridicalPersons.forEach((nJuridicalData) => {
      const promise = this.personRepository
        .save(nJuridicalData)
        .then((savedPerson) => {
          nJuridicalData.person = savedPerson;
          const naturalPerson =
            this.juridicalPersonRepository.create(nJuridicalData);
          return this.juridicalPersonRepository.save(naturalPerson);
        });
      insertPromises.push(promise);
    });
    await Promise.all(insertPromises);
    console.log('JuridicalPersons insertados correctamente');
    return true;
  }

  private async insertSubscriptionsType() {
    const insertPromises: Promise<SubscriptionsType>[] = [];
    initialData.subscriptionTypes.forEach((sType) => {
      insertPromises.push(this.subscriptionsTypeRepository.save(sType));
    });
    await Promise.all(insertPromises);
    console.log('subscriptionType insertados');
    return true;
  }

  private async insertServicesType(): Promise<boolean> {
    const insertPromises: Promise<ServicesType>[] = [];
    initialData.serviceTypes.forEach((dType) => {
      insertPromises.push(this.servicesTypeRepository.save(dType));
    });
    await Promise.all(insertPromises);
    console.log('documentIdentityType insertados');
    return true;
  }

  private async insertServices(): Promise<boolean> {
    const servicesTypeInfraestructura =
      await this.servicesTypeRepository.findOneBy({
        serviceTypeId: 'm5n6o7p8-1234-5678-90jk-lmno01234567',
      });

    if (!servicesTypeInfraestructura) {
      throw new Error('No se encontró el tipo de servicio Infraestructura.');
    }

    const insertPromises: Promise<Service>[] = [];

    for (const service of initialData.services) {
      service.serviceType = servicesTypeInfraestructura;
      insertPromises.push(this.serviceRepository.save(service));
    }

    await Promise.all(insertPromises);
    console.log('Servicios insertados correctamente');
    return true;
  }

  // private async insertServices_(): Promise<boolean> {
  //   const insertPromises: Promise<Service>[] = [];
  //
  //   const servicesTypeInfraestructura =
  //     await this.servicesTypeRepository.findOneBy({
  //       serviceTypeId: 'm5n6o7p8-1234-5678-90jk-lmno01234567',
  //     });
  //
  //   initialData.services.forEach((service) => {
  //     service.serviceType = servicesTypeInfraestructura;
  //     insertPromises.push(this.serviceRepository.save(service));
  //   });
  //   await Promise.all(insertPromises);
  //   console.log('documentIdentityType insertados');
  //   return true;
  // }

  private async deleteAllTables(): Promise<void> {
    await this.naturalPersonRepository.deleteAll();
    await this.juridicalPersonRepository.deleteAll();
    await this.personRepository.deleteAll();
    await this.personTypeRepository.deleteAll();
    await this.documentIdentityTypeRepository.deleteAll();
    await this.subscriptionsTypeRepository.deleteAll();
    await this.serviceRepository.deleteAll();
    await this.servicesTypeRepository.deleteAll();
  }
}
