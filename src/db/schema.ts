import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const flows = pgTable("flows", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: text("userId").notNull(),
	name: text("name").notNull(),
	description: text("description"),
	deploymentId: text("deploymentId").notNull(),
	route: text("route").notNull(),
	icon: text("icon").notNull(),
	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow(),
});

export const flowFields = pgTable("flow_fields", {
	id: uuid("id").defaultRandom().primaryKey(),
	flowId: uuid("flowId").references(() => flows.id, { onDelete: "cascade" }).notNull(),
	name: text("name").notNull(),
	type: text("type").notNull(),
	label: text("label").notNull(),
	placeholder: text("placeholder"),
	defaultValue: text("defaultValue"),
	options: text("options"), // JSON string para campos select
	order: integer("order").notNull(),
	createdAt: timestamp("createdAt").defaultNow(),
});

export const runs = pgTable("runs", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: text("userId").notNull(),
	runId: text("runId").notNull(),
	deploymentId: text("deploymentId"),
	prompt: text("prompt"),
	imageUrl: text("imageUrl"),
	liveStatus: text("liveStatus"),
	createdAt: timestamp("createdAt").defaultNow(),
	updatedAt: timestamp("updatedAt").defaultNow(),
});
  