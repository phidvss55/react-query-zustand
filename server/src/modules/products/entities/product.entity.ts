import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public category: string;

  @Column()
  public description: string;

  @Column()
  public title: string;
}

export default Product;
