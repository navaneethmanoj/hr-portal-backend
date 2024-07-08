import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDepartment1720421430369 implements MigrationInterface {
    name = 'CreateDepartment1720421430369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "department" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_471da4b90e96c1ebe0af221e07b" UNIQUE ("name"), CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "dept_name" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_04fa60b7d27aac772fed27f1eea" FOREIGN KEY ("dept_name") REFERENCES "department"("name") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_04fa60b7d27aac772fed27f1eea"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "dept_name"`);
        await queryRunner.query(`DROP TABLE "department"`);
    }

}
