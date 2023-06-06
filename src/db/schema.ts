import { InferModel, eq, relations } from "drizzle-orm";
import {
  bigint,
  boolean,
  json,
  mysqlTable,
  primaryKey,
  smallint,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { db } from "./db";
// import { createInsertSchema, createSelectSchema, } from "drizzle-zod";

// TODO Use Drizzle relations here https://orm.drizzle.team/docs/rqb

export const user = mysqlTable("auth_user", {
  id: varchar("id", {
    length: 15, // change this when using custom user ids
  }).primaryKey(),
  username: text("username"),
  email: varchar("email", { length: 255 }),
});

export const session = mysqlTable("auth_session", {
  id: varchar("id", {
    length: 128,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  }).notNull(),
  activeExpires: bigint("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number",
  }).notNull(),
});

export const key = mysqlTable("auth_key", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  }).notNull(),
  primaryKey: boolean("primary_key").notNull(),
  hashedPassword: varchar("hashed_password", {
    length: 255,
  }),
  expires: bigint("expires", {
    mode: "number",
  }),
});

export const aiModel = mysqlTable("ai_model", {
  id: varchar("id", {
    length: 36,
  }).primaryKey(),
  isAvailable: boolean("is_available").notNull(),
  name: text("name").notNull(),
});

export const aiModelRelations = relations(aiModel, ({ many }) => ({
  category: many(category),
}));

export const category = mysqlTable("category", {
  id: varchar("id", {
    length: 36,
  }).primaryKey(),
  title: text("title").notNull(),
  metaChunks: json("meta_chunks").notNull(),
  negativeMetaChunks: json("negative_meta_chunks").notNull(),
  sortOrder: smallint("sort_order").notNull(),
  aiId: varchar("ai_id", {
    length: 36,
  }).notNull(),
});

export const categoryRelations = relations(category, ({ one, many }) => ({
  aiModelParent: one(aiModel, {
    fields: [category.aiId],
    references: [aiModel.id],
  }),
  categoryValue: many(categoryValue),
}));

export const categoryValue = mysqlTable("category_value", {
  id: varchar("id", {
    length: 36,
  }).primaryKey(),
  chunk: text("chunk").notNull(),
  categoryId: varchar("category_id", {
    length: 36,
  }).notNull(),
  imageUrl: text("image_url").notNull(),
  metaChunks: json("meta_chunks").notNull(),
  negativeMetaChunks: json("negative_meta_chunks").notNull(),
  ai_id: varchar("ai_id", {
    length: 36,
  }).notNull(),
});

export const categoryValueRelations = relations(
  categoryValue,
  ({ one, many }) => ({
    parentCategory: one(category, {
      fields: [categoryValue.categoryId],
      references: [category.id],
    }),
    promptToCategoryValuesMapping: many(promptCategoryValuesMapping),
  })
);

export const prompt = mysqlTable("prompt", {
  id: varchar("id", {
    length: 36,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  }).notNull(),
  title: text("title").notNull(),
  emoji: text("emoji").notNull().default("🤔"),
  subject: text("subject").notNull(),
  generatedPrompt: text("prompt").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const promptRelations = relations(prompt, ({ many }) => ({
  promptToCategoryValuesMapping: many(promptCategoryValuesMapping),
}));

export const promptCategoryValuesMapping = mysqlTable(
  "prompt_category_mapping",
  {
    promptId: varchar("prompt_id", {
      length: 36,
    }).notNull(),
    categoryValueId: varchar("category_value_id", {
      length: 36,
    }).notNull(),
    weight: smallint("weight").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey(table.promptId, table.categoryValueId),
    };
  }
);

export const promptToCategoryValuesMapping = relations(
  promptCategoryValuesMapping,
  ({ one }) => ({
    prompt: one(prompt, {
      fields: [promptCategoryValuesMapping.promptId],
      references: [prompt.id],
    }),
    categoryValue: one(categoryValue, {
      fields: [promptCategoryValuesMapping.categoryValueId],
      references: [categoryValue.id],
    }),
  })
);

export type AiModel = InferModel<typeof aiModel>;
export type Category = InferModel<typeof category>;
export type CategoryValue = InferModel<typeof categoryValue>;
export type Prompt = InferModel<typeof prompt>;
export type PromptCategoryValuesMapping = InferModel<
  typeof promptCategoryValuesMapping
>;

const getPromptWithCategoryValues = async (id: string) => {
  const res = await db.query.prompt.findFirst({
    where: eq(prompt.id, id),
    with: {
      promptToCategoryValuesMapping: { with: { categoryValue: true } },
    },
  });

  return res;
};

export type PromptWithCategoryValues = NonNullable<
  Awaited<ReturnType<typeof getPromptWithCategoryValues>>
>;
