import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAgeField1720084643300 implements MigrationInterface {
    name = 'AddAgeField1720084643300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "age" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "age"`);
    }

}
