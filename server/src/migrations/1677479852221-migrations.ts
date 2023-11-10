import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1677479852221 implements MigrationInterface {
  name = 'migrations1677479852221';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "adm_usr" ADD "role_ids" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "adm_usr" DROP COLUMN "role_ids"`);
  }
}
