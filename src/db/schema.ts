import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const flows = pgTable("flows", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: text("user_id").notNull(),
	name: text("name").notNull(),
	description: text("description"),
	deploymentId: text("deployment_id").notNull(),
	route: text("route").notNull(),
	icon: text("icon").notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export const flowFields = pgTable("flow_fields", {
	id: uuid("id").defaultRandom().primaryKey(),
	flowId: uuid("flow_id").references(() => flows.id, { onDelete: "cascade" }).notNull(),
	name: text("name").notNull(),
	type: text("type").notNull(),
	label: text("label").notNull(),
	placeholder: text("placeholder"),
	defaultValue: text("default_value"),
	options: text("options"), // JSON string para campos select
	order: integer("order").notNull(),
	createdAt: timestamp("created_at").defaultNow(),
});
  