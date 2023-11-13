import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'students',
  // orderBy: {
  //   id: 'DESC',
  // },
})
export class Student {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public last_name: string;

  @Column()
  public first_name: string;

  @Column()
  public gender: string;

  @Column()
  public country: string;

  @Column()
  public email: string;

  @Column({
    nullable: true,
  })
  public avatar?: string;

  @Column()
  public btc_address: string;
}

export default Student;
