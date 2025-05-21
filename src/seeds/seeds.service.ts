import { Injectable } from '@nestjs/common';
import { initialData } from './data/seed.data';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { PersonsType } from '../admin-persons/persons-type/entities/persons-type.entity';
import { Repository } from 'typeorm';
import { NaturalPerson } from '../admin-persons/natural-persons/entities/natural-person.entity';
import { JuridicalPerson } from '../admin-persons/juridical-persons/entities/juridical-person.entity';
import { Person } from '../admin-persons/persons/entities/person.entity';
import { SubscriptionsType } from '../admin-subscriptions/subscriptions-type/entities/subscriptions-type.entity';
import { DocumentIdentityType } from '../admin-persons/document-identity-type/entities/document-identity-type.entity';
import { ServicesType } from '../admin-services/services-type/entities/services-type.entity';
import { Service } from '../admin-services/services/entities/service.entity';
import { AttributesType } from '../admin-services/attributes-type/entities/attributes-type.entity';
import { Attribute } from '../admin-services/attributes/entities/attribute.entity';
import { Equipment } from '../admin-services/equipment/entities/equipment.entity';
import { EquipmentResources } from '../admin-services/equipment/entities/equipment-resources.entity';
import { Laboratory } from '../admin-services/laboratories/entities/laboratory.entity';
import { LaboratoryEquipment } from '../admin-services/laboratories/entities/laboratory-equipment.entity';
import { Subscription } from '../admin-subscriptions/subscriptions/entities/subscription.entity';
import { SubscriptionDetail } from '../admin-subscriptions/subscriptions/entities/subscriptionDetail.entity';
import { Parameter } from '../admin-subscriptions/parameters/entities/parameter.entity';
import { Day } from '../admin-programming/day/entities/day.entity';
import { ProgrammingSubscriptionDetail } from '../admin-programming/programming/entities/programming-subscription-detail.entity';
import { StatusProgramming } from '../admin-programming/programming/enums/status-programming.enum';
import { ProgrammingDay } from '../admin-programming/programming/entities/programming-day.entity';
import { ProgrammingHours } from '../admin-programming/programming/entities/programming-hours.entity';

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
    @InjectRepository(ServicesType)
    private readonly servicesTypeRepository: Repository<ServicesType>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(AttributesType)
    private readonly attributesTypeRepository: Repository<AttributesType>,
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
    @InjectRepository(EquipmentResources)
    private readonly equipmentResourcesRepository: Repository<EquipmentResources>,
    @InjectRepository(Laboratory)
    private readonly laboratoryRepository: Repository<Laboratory>,
    @InjectRepository(LaboratoryEquipment)
    private readonly laboratoryEquipmentRepository: Repository<LaboratoryEquipment>,
    @InjectRepository(SubscriptionsType)
    private readonly subscriptionsTypeRepository: Repository<SubscriptionsType>,
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(SubscriptionDetail)
    private readonly subscriptionDetailRepository: Repository<SubscriptionDetail>,
    @InjectRepository(Parameter)
    private readonly parameterRepository: Repository<Parameter>,
    @InjectRepository(Day)
    private readonly dayRepository: Repository<Day>,
    @InjectRepository(ProgrammingSubscriptionDetail)
    private readonly programmingSubscriptionDetailRepository: Repository<ProgrammingSubscriptionDetail>,
    @InjectRepository(ProgrammingDay)
    private readonly programmingDayRepository: Repository<ProgrammingDay>,
    @InjectRepository(ProgrammingHours)
    private readonly programmingHoursRepository: Repository<ProgrammingHours>,
  ) {}

  async runSeed(): Promise<string> {
    await this.deleteAllTables();

    /** register persons */
    // await this.insertPersonType();
    // await this.insertDocumentIdentityType();
    // await this.inserNaturalPerson();
    // await this.inserJuridicalPerson();

    /** register Equipment */
    // await this.insertAttributeTypes();
    // await this.insertAttributes();
    // await this.insertEquipment();
    // await this.insertAttributesToEquipment();

    /** register Laboratories */
    // await this.insertServicesType();
    // await this.insertLaboratories();
    // await this.insertLaboratoriesEquipment();

    /** register subscriptions */
    // await this.insertSubscriptionsType();
    // await this.insertSubscriptions();

    /** register program*/
    // await this.insertDays();
    // await this.insertProgrammingSubscription();
    // await this.insertProgrammingDays();
    await this.insertProgrammingHours();

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

  private async insertServicesType(): Promise<boolean> {
    const insertPromises: Promise<ServicesType>[] = [];
    initialData.serviceTypes.forEach((dType) => {
      insertPromises.push(this.servicesTypeRepository.save(dType));
    });
    await Promise.all(insertPromises);
    console.log('documentIdentityType insertados');
    return true;
  }

  private async insertServicesTypexx(): Promise<boolean> {
    const insertPromises: Promise<ServicesType>[] = [];
    initialData.serviceTypes.forEach((dType) => {
      insertPromises.push(this.servicesTypeRepository.save(dType));
    });
    await Promise.all(insertPromises);
    console.log('documentIdentityType insertados');
    return true;
  }

  private async insertAttributeTypes(): Promise<boolean> {
    const insertPromises: Promise<AttributesType>[] = [];
    initialData.attributeTypes.forEach((dType) => {
      insertPromises.push(this.attributesTypeRepository.save(dType));
    });
    await Promise.all(insertPromises);
    console.log('AttributeTypes insertados');
    return true;
  }

  private async insertAttributes(): Promise<boolean> {
    const attributeType = await this.attributesTypeRepository.findOneBy({
      attributesTypeId: 'z8a9b0c1-4567-8901-23wx-yzab34567890',
    });

    if (!attributeType) {
      throw new Error('No se encontró el tipo de atributo');
    }

    const insertPromises: Promise<Attribute>[] = [];

    for (const attribute of initialData.attributes) {
      attribute.attributesType = attributeType;
      insertPromises.push(this.attributeRepository.save(attribute));
    }

    await Promise.all(insertPromises);
    console.log('Atributos insertados correctamente');
    return true;
  }

  private async insertEquipment(): Promise<boolean> {
    const insertPromises: Promise<Equipment>[] = [];
    initialData.equipments.forEach((equipment) => {
      insertPromises.push(this.equipmentRepository.save(equipment));
    });
    await Promise.all(insertPromises);
    console.log('Equipment insertados');
    return true;
  }

  private async insertAttributesToEquipment(): Promise<boolean> {
    const ramMemory = await this.attributeRepository.findOneBy({
      attributeId: 'b0c1d2e3-6789-0123-45yz-abcd56789012',
    });
    if (!ramMemory) {
      throw new Error(`No se encontró ramMemory`);
    }
    const processor = await this.attributeRepository.findOneBy({
      attributeId: 'c1d2e3f4-7890-1234-56za-bcde67890123',
    });
    if (!processor) {
      throw new Error(`No se encontró procesador`);
    }
    const storage = await this.attributeRepository.findOneBy({
      attributeId: 'e3f4g5h6-9012-3456-78bc-defg89012345',
    });
    if (!storage) {
      throw new Error(`No se encontró storage`);
    }
    const operatingSystem = await this.attributeRepository.findOneBy({
      attributeId: 'i7j8k9l0-3456-7890-12fg-hijk23456789',
    });
    if (!operatingSystem) {
      throw new Error(`No se encontró operatingSystem`);
    }

    const graphicsCard = await this.attributeRepository.findOneBy({
      attributeId: 'd2e3f4g5-8901-2345-67ab-cdef78901234',
    });
    if (!graphicsCard) {
      throw new Error(`No se encontró graphicsCard`);
    }

    const equipments = await this.equipmentRepository.find();

    const insertPromises: Promise<EquipmentResources>[] = [];

    equipments.forEach((equipment) => {
      const attributes = [
        ramMemory,
        processor,
        storage,
        operatingSystem,
        graphicsCard,
      ];

      attributes.forEach((attribute) => {
        const resource = this.equipmentResourcesRepository.create({
          equipmentResourcesId: randomUUID(),
          description: this.getRandomAttributeValue(attribute.attributeId),
          equipment,
          attribute,
          isActive: true,
        });
        insertPromises.push(this.equipmentResourcesRepository.save(resource));
      });
    });

    await Promise.all(insertPromises);

    console.log('Atributos basicos insertados a todos los equipos');
    return true;
  }

  /**Laboratories */
  private async insertLaboratories(): Promise<boolean> {
    const insertPromises: Promise<Laboratory>[] = [];

    for (const laboratory of initialData.laboratories) {
      const vdiVirtualDesktops = await this.servicesTypeRepository.findOneBy({
        serviceTypeId: 'o7p8q9r0-3456-7890-12lm-nopq23456789',
      });
      if (!vdiVirtualDesktops) {
        throw new Error(`No se encontró el tipo servicio`);
      }
      laboratory.serviceType = vdiVirtualDesktops;

      const promise = this.serviceRepository
        .save(laboratory)
        .then(async (savedService) => {
          laboratory.service = savedService;
          const laboratoryData = this.laboratoryRepository.create(laboratory);
          return this.laboratoryRepository.save(laboratoryData);
        });

      insertPromises.push(promise);
    }

    await Promise.all(insertPromises);
    console.log('NaturalPersons insertados correctamente');
    return true;
  }

  private async insertLaboratoriesEquipment(): Promise<boolean> {
    const laboratories = await this.laboratoryRepository.find();
    const equipment = await this.equipmentRepository.find();

    const insertPromises: Promise<LaboratoryEquipment>[] = [];

    laboratories.forEach((laboratory) => {
      const randomEquipment =
        equipment[Math.floor(Math.random() * equipment.length)];

      const resource = this.laboratoryEquipmentRepository.create({
        laboratoryEquipeId: randomUUID(),
        laboratory,
        quantity: laboratory.capacity,
        equipment: randomEquipment,
      });
      insertPromises.push(this.laboratoryEquipmentRepository.save(resource));
    });

    await Promise.all(insertPromises);

    console.log('Atributos basicos insertados a todos los equipos');
    return true;
  }

  /** programing */
  private async insertDays() {
    const insertPromises: Promise<Day>[] = [];
    initialData.days.forEach((day) => {
      insertPromises.push(this.dayRepository.save(day));
    });
    await Promise.all(insertPromises);
    console.log('days insertados');
    return true;
  }

  /** subscriptions */

  private async insertSubscriptionsType() {
    const insertPromises: Promise<SubscriptionsType>[] = [];
    initialData.subscriptionTypes.forEach((sType) => {
      insertPromises.push(this.subscriptionsTypeRepository.save(sType));
    });
    await Promise.all(insertPromises);
    console.log('subscriptionType insertados');
    return true;
  }

  private async insertSubscriptions(): Promise<boolean> {
    const insertPromises: Promise<SubscriptionDetail>[] = [];

    for (const subscription of initialData.subscriptions) {
      const subscriptionsType = await this.subscriptionsTypeRepository.find();
      subscription.subscriptionType =
        subscriptionsType[Math.floor(Math.random() * subscriptionsType.length)];

      const person = await this.personRepository.find();
      subscription.person = person[Math.floor(Math.random() * person.length)];

      const service = await this.serviceRepository.find();

      const randomService = service[Math.floor(Math.random() * service.length)];

      const promise = this.subscriptionRepository
        .save(subscription)
        .then(async (savedSubscription) => {
          const parameter = this.parameterRepository.create({
            parameterId: subscription.subscriptionId,
            subscription: savedSubscription,
            description: '-',
            numberReservationDay:
              Math.floor(Math.random() * (35 - 15 + 1)) + 15,
            miniumNumberMinutes:
              Math.floor(Math.random() * (120 - 50 + 1)) + 60,
            rangeBetweenReservations:
              Math.floor(Math.random() * (120 - 50 + 1)) + 60,
          });

          await this.parameterRepository.save(parameter);

          const subscriptionDetail = this.subscriptionDetailRepository.create({
            subscriptionDetailId: randomUUID(),
            subscription: savedSubscription,
            service: randomService,
            accountsNumber: Math.floor(Math.random() * (200 - 50 + 1)) + 50,
          });
          return this.subscriptionDetailRepository.save(subscriptionDetail);
        });

      insertPromises.push(promise);
    }

    await Promise.all(insertPromises);
    console.log('Subscriptions insertados correctamente');
    return true;
  }

  private async insertProgrammingSubscription(): Promise<boolean> {
    const insertPromises: Promise<ProgrammingSubscriptionDetail>[] = [];

    const subscriptionDetails = await this.subscriptionDetailRepository.find({
      relations: ['subscription', 'service'],
    });
    for (const detalle of subscriptionDetails) {
      const randomProgrammingDates = this.getRandomDateRanges(
        detalle.subscription.initialDate,
        detalle.subscription.finalDate,
      );

      for (const programmingDates of randomProgrammingDates) {
        const programming = this.programmingSubscriptionDetailRepository.create(
          {
            programmingSubscriptionDetailId: randomUUID(),
            subscriptionDetail: detalle,
            initialDate: programmingDates.startDate,
            finalDate: programmingDates.endDate,
            metadata: {
              createdBy: 'SYSTEM',
              lastModifiedBy: 'SYSTEM',
            },
            status: StatusProgramming.ACTIVE,
          },
        );
        //await this.programmingSubscriptionDetailRepository.save(programming);
        insertPromises.push(
          this.programmingSubscriptionDetailRepository.save(programming),
        );
      }
    }
    await Promise.all(insertPromises);
    console.log('Programming  insertados correctamente');
    return true;
  }

  private async insertProgrammingDays(): Promise<boolean> {
    const insertPromises: Promise<ProgrammingDay>[] = [];
    const programmingSubscriptionDetails =
      await this.programmingSubscriptionDetailRepository.find();
    const dayList = await this.dayRepository.find();

    for (const programming of programmingSubscriptionDetails) {
      for (const day of dayList) {
        const programmingDay = this.programmingDayRepository.create({
          programmingDayId: randomUUID(),
          day: day,
          programmingSubscriptionDetail: programming,
        });
        insertPromises.push(this.programmingDayRepository.save(programmingDay));
      }
    }
    await Promise.all(insertPromises);
    console.log('ProgrammingDays insertados correctamente');
    return true;
  }

  private async insertProgrammingHours(): Promise<boolean> {
    const insertPromises: Promise<ProgrammingHours>[] = [];
    const programmingDays = await this.programmingDayRepository.find();
    for (const programming of programmingDays) {
      const randomHous = this.getRandomDateHours();
      for (const hour of randomHous) {
        const programmingHour = this.programmingHoursRepository.create({
          programmingHoursId: randomUUID(),
          programmingDay: programming,
          initialHour: hour.startTime,
          finalHour: hour.endTime,
          isActive: true,
        });
        insertPromises.push(
          this.programmingHoursRepository.save(programmingHour),
        );
      }
    }

    await Promise.all(insertPromises);
    console.log('ProgrammingHours insertados correctamente');
    return true;
  }

  private async generateProgramming(
    subscriptionDetail: SubscriptionDetail,
    randomProgrammingDates: { startDate: Date; endDate: Date }[],
  ): Promise<boolean> {
    console.log(subscriptionDetail);
    for (const programmingDates of randomProgrammingDates) {
      const programming = this.programmingSubscriptionDetailRepository.create({
        programmingSubscriptionDetailId: randomUUID(),
        subscriptionDetail: subscriptionDetail,
        initialDate: programmingDates.startDate,
        finalDate: programmingDates.endDate,
        metadata: {
          createdBy: 'SYSTEM',
          lastModifiedBy: 'SYSTEM',
        },
        status: StatusProgramming.ACTIVE,
      });
      await this.programmingSubscriptionDetailRepository.save(programming);
    }
    const insertPromises: Promise<SubscriptionDetail>[] = [];
    await Promise.all(insertPromises);
    return true;
  }

  private getRandomDateRanges(
    startDate: Date,
    finalDate: Date,
  ): {
    startDate: Date;
    endDate: Date;
  }[] {
    const monthOptions = [1, 3, 6];
    const ranges: { startDate: Date; endDate: Date }[] = [];

    let currentStart = new Date(startDate);

    while (currentStart < finalDate) {
      const remainingMonths =
        finalDate.getMonth() -
        currentStart.getMonth() +
        12 * (finalDate.getFullYear() - currentStart.getFullYear());

      const validOptions = monthOptions.filter((m) => m <= remainingMonths);

      if (validOptions.length === 0) break;

      const randomIndex = Math.floor(Math.random() * validOptions.length);
      const monthsToAdd = validOptions[randomIndex];

      const currentEnd = new Date(currentStart);
      currentEnd.setMonth(currentEnd.getMonth() + monthsToAdd);

      if (currentEnd > finalDate) {
        ranges.push({ startDate: currentStart, endDate: new Date(finalDate) });
        break;
      } else {
        ranges.push({ startDate: currentStart, endDate: currentEnd });

        const nextStart = new Date(currentEnd);
        nextStart.setDate(nextStart.getDate() + 1);

        currentStart = nextStart;
      }
    }

    return ranges;
  }

  private getRandomDateRange(startDate: Date): {
    startDate: Date;
    endDate: Date;
  } {
    const monthOptions = [1, 3, 6];
    const randomIndex = Math.floor(Math.random() * monthOptions.length);
    const monthsToAdd = monthOptions[randomIndex];

    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + monthsToAdd);

    return {
      startDate,
      endDate,
    };
  }

  private async deleteAllTables(): Promise<void> {
    /**subscriptions*/
    await this.programmingHoursRepository.deleteAll();
    // await this.programmingDayRepository.deleteAll();
    // await this.programmingSubscriptionDetailRepository.deleteAll();
    // await this.subscriptionDetailRepository.deleteAll();
    // await this.parameterRepository.deleteAll();
    // await this.subscriptionRepository.deleteAll();
    // await this.dayRepository.deleteAll();

    /** persons */
    // await this.naturalPersonRepository.deleteAll();
    // await this.juridicalPersonRepository.deleteAll();
    // await this.personRepository.deleteAll();
    /** register Laboratories */
    // await this.laboratoryEquipmentRepository.deleteAll();
    // await this.laboratoryRepository.deleteAll();
    // await this.serviceRepository.deleteAll();
    /** register Equipment */
    // await this.equipmentResourcesRepository.deleteAll();
    // await this.equipmentRepository.deleteAll();
    // await this.attributeRepository.deleteAll();
    /** others */
    // await this.servicesTypeRepository.deleteAll();
    // await this.attributesTypeRepository.deleteAll();
    // await this.personTypeRepository.deleteAll();
    // await this.documentIdentityTypeRepository.deleteAll();
    // await this.subscriptionsTypeRepository.deleteAll();
  }

  private getRandomDateHours(): { startTime: string; endTime: string }[] {
    // horario comun
    const startHour = 7;
    const endHour = 23;
    const programmingCount = Math.random() < 0.5 ? 1 : 2; // al azar 1 o 2 , 1 programa de 8 , 2 dos programas de  4horas

    if (programmingCount === 1) {
      // Una programación de 8 horas
      const maxStartHour = endHour - 8;
      const start = this.getRandomInt(startHour, maxStartHour);
      const end = start + 8;

      return [
        {
          startTime: this.formatHour(start),
          endTime: this.formatHour(end),
        },
      ];
    } else {
      // Dos programaciones de 4 horas separadas por 2 horas
      const totalNeededTime = 4 + 2 + 4; // 10 horas
      const maxStartHour = endHour - totalNeededTime;
      const firstStart = this.getRandomInt(startHour, maxStartHour);
      const firstEnd = firstStart + 4;
      const secondStart = firstEnd + 2;
      const secondEnd = secondStart + 4;

      return [
        {
          startTime: this.formatHour(firstStart),
          endTime: this.formatHour(firstEnd),
        },
        {
          startTime: this.formatHour(secondStart),
          endTime: this.formatHour(secondEnd),
        },
      ];
    }
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private formatHour(hour: number): string {
    return `${hour.toString().padStart(2, '0')}:00`;
  }

  getRandomAttributeValue(type: string): string {
    const memoryOptions = [
      '4GB DDR4',
      '8GB DDR4',
      '16GB DDR4',
      '32GB DDR4',
      '64GB DDR4',
    ];
    const processorOptions = [
      'Intel Core i3',
      'Intel Core i5',
      'Intel Core i7',
      'Intel Core i9',
      'AMD Ryzen 3',
      'AMD Ryzen 5',
      'AMD Ryzen 7',
      'AMD Ryzen 9',
      'Intel Xeon',
      'Apple M1',
      'Apple M2',
      'Qualcomm Snapdragon',
      'Intel Pentium',
      'Intel Celeron',
      'AMD Athlon',
      'AMD FX',
      'AMD A10',
      'MediaTek Dimensity',
      'Samsung Exynos',
      'Intel Core 2 Duo',
    ];
    const storageOptions = [
      '128GB SSD',
      '256GB SSD',
      '500GB SSD',
      '512GB SSD',
      '1TB NVMe',
      '2TB NVMe',
      '4TB NVMe',
      '8TB SSD',
      '16TB HDD',
      '32TB HDD',
    ];
    const osOptions = [
      'Windows 10',
      'Windows 11',
      'Ubuntu 24.04.2 LTS',
      'macOS 13 ventura',
      'Debian 12 Bookworm',
    ];

    const graphicCardsOptions = [
      'NVIDIA GeForce RTX 4090',
      'AMD Radeon RX 7900 XTX',
      'NVIDIA GeForce RTX 4070',
      'AMD Radeon RX 6800 XT',
      'NVIDIA GeForce RTX 3060',
      'AMD Radeon RX 6700 XT',
      'NVIDIA GeForce GTX 1660',
      'Intel Arc A770',
      'NVIDIA Quadro RTX 4000',
      'AMD Radeon Pro W5700',
    ];

    const randomFrom = (options: string[]) =>
      options[Math.floor(Math.random() * options.length)];

    switch (type.toLowerCase()) {
      case 'ram':
      case 'b0c1d2e3-6789-0123-45yz-abcd56789012':
        return randomFrom(memoryOptions);
      case 'cpu':
      case 'c1d2e3f4-7890-1234-56za-bcde67890123':
        return randomFrom(processorOptions);
      case 'storage':
      case 'e3f4g5h6-9012-3456-78bc-defg89012345':
        return randomFrom(storageOptions);
      case 'os':
      case 'i7j8k9l0-3456-7890-12fg-hijk23456789':
        return randomFrom(osOptions);
      case 'graphic':
      case 'd2e3f4g5-8901-2345-67ab-cdef78901234':
        return randomFrom(graphicCardsOptions);
      default:
        throw new Error(`Tipo desconocido: ${type}`);
    }
  }
}
