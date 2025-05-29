import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1592555965808 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'serial', // Use serial for auto-increment integer in Postgres
              isPrimary: true,
            },
            {
              name: 'email',
              type: 'varchar',
              isUnique: true,
            },
            {
              name: 'firstName',
              type: 'varchar',
            },
            {
              name: 'lastName',
              type: 'varchar',
            },
            {
              name: 'password',
              type: 'varchar(60)',
            },
            {
              name: 'isActive',
              type: 'smallint', // 'int2' is Postgres internal, 'smallint' is better for clarity
              default: 1,
            },
            {
              name: 'createdAt',
              type: 'timestamp', // Use timestamp or timestamptz
              default: 'now()', // Postgres uses now() function for current timestamp
              isNullable: true,
            },
            {
              name: 'updatedAt',
              type: 'timestamp',
              default: 'now()',
              isNullable: true,
            },
          ],
        }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
