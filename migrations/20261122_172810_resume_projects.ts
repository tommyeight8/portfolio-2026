import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "resume_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar
  );
  
  ALTER TABLE "resume" ADD COLUMN "headline" varchar;
  ALTER TABLE "resume_projects" ADD CONSTRAINT "resume_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resume"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "resume_projects_order_idx" ON "resume_projects" USING btree ("_order");
  CREATE INDEX "resume_projects_parent_id_idx" ON "resume_projects" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "resume_projects" CASCADE;
  ALTER TABLE "resume" DROP COLUMN "headline";`)
}
