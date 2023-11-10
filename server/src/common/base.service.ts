import { Injectable } from '@nestjs/common';
import { orderedUuid } from '@common/string.util';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class BaseService<Entity> {
  public repository: Repository<Entity>;

  constructor(repository: Repository<Entity>) {
    this.repository = repository;
  }

  store(data: DeepPartial<Entity>): Promise<Entity> {
    const entity = this.repository.create({ id: orderedUuid(), ...data });
    return this.repository.save(entity);
  }
}
