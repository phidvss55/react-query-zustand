import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TaskState {
  PLANNED = 'PLANNED',
  ONGOING = 'ONGOING',
  DONE = 'DONE',
}

@Entity({
  name: 'tasks',
})
export class Task {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column({
    type: 'enum',
    enum: TaskState,
    default: TaskState.PLANNED,
  })
  public state: string;
}
