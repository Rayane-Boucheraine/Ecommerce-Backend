import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1721652108051 implements MigrationInterface {
  name = 'Initial1721652108051';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, 
        "email" character varying NOT NULL, "password" character varying NOT NULL,
        "roles" "public"."users_roles_enum" array NOT NULL DEFAULT '{user}',
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
