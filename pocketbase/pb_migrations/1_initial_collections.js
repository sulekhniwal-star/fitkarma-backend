/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);

  // 1. Update Users Collection
  const usersCollection = dao.findCollectionByNameOrId("users");
  usersCollection.schema.addField(new SchemaField({
    name: "age",
    type: "number",
    min: 0,
    max: 120,
  }));
  usersCollection.schema.addField(new SchemaField({
    name: "height",
    type: "number",
    min: 0,
  }));
  usersCollection.schema.addField(new SchemaField({
    name: "weight",
    type: "number",
    min: 0,
  }));
  usersCollection.schema.addField(new SchemaField({
    name: "gender",
    type: "select",
    values: ["male", "female", "other"],
  }));
  usersCollection.schema.addField(new SchemaField({
    name: "karma_total",
    type: "number",
    default: 0,
  }));
  dao.saveCollection(usersCollection);

  // 2. Steps Collection
  const steps = new Collection({
    name: "steps",
    type: "base",
    schema: [
      { name: "user", type: "relation", required: true, options: { collectionId: usersCollection.id, cascadeDelete: true } },
      { name: "count", type: "number", required: true, min: 0 },
      { name: "date", type: "date", required: true },
    ],
    listRule: "@request.auth.id = user.id",
    viewRule: "@request.auth.id = user.id",
    createRule: "@request.auth.id = user.id",
    updateRule: "@request.auth.id = user.id",
    deleteRule: "@request.auth.id = user.id",
  });
  dao.saveCollection(steps);

  // 3. Food Logs Collection
  const foodLogs = new Collection({
    name: "food_logs",
    type: "base",
    schema: [
      { name: "user", type: "relation", required: true, options: { collectionId: usersCollection.id, cascadeDelete: true } },
      { name: "item_name", type: "text", required: true },
      { name: "calories", type: "number", required: true },
      { name: "macros", type: "json" },
      { name: "date", type: "date", required: true },
    ],
    listRule: "@request.auth.id = user.id",
    viewRule: "@request.auth.id = user.id",
    createRule: "@request.auth.id = user.id",
    updateRule: "@request.auth.id = user.id",
    deleteRule: "@request.auth.id = user.id",
  });
  dao.saveCollection(foodLogs);

  // 4. Workouts Collection
  const workouts = new Collection({
    name: "workouts",
    type: "base",
    schema: [
      { name: "user", type: "relation", required: true, options: { collectionId: usersCollection.id, cascadeDelete: true } },
      { name: "name", type: "text", required: true },
      { name: "duration_minutes", type: "number", required: true },
      { name: "type", type: "text" },
      { name: "date", type: "date", required: true },
    ],
    listRule: "@request.auth.id = user.id",
    viewRule: "@request.auth.id = user.id",
    createRule: "@request.auth.id = user.id",
    updateRule: "@request.auth.id = user.id",
    deleteRule: "@request.auth.id = user.id",
  });
  dao.saveCollection(workouts);

  // 5. Medical Reports Collection
  const medicalReports = new Collection({
    name: "medical_reports",
    type: "base",
    schema: [
      { name: "user", type: "relation", required: true, options: { collectionId: usersCollection.id, cascadeDelete: true } },
      { name: "file", type: "file", options: { maxSelect: 1, maxSize: 5242880 } },
      { name: "extracted_text", type: "text" },
      { name: "vitals", type: "json" },
      { name: "date", type: "date", required: true },
    ],
    listRule: "@request.auth.id = user.id",
    viewRule: "@request.auth.id = user.id",
    createRule: "@request.auth.id = user.id",
    updateRule: "@request.auth.id = user.id",
    deleteRule: "@request.auth.id = user.id",
  });
  dao.saveCollection(medicalReports);

  // 6. Karma Points Collection
  const karmaPoints = new Collection({
    name: "karma_points",
    type: "base",
    schema: [
      { name: "user", type: "relation", required: true, options: { collectionId: usersCollection.id, cascadeDelete: true } },
      { name: "amount", type: "number", required: true },
      { name: "reason", type: "text", required: true },
      { name: "date", type: "date", required: true },
    ],
    listRule: "@request.auth.id = user.id",
    viewRule: "@request.auth.id = user.id",
    createRule: "@request.auth.id = user.id",
    updateRule: "@request.auth.id = user.id",
    deleteRule: "@request.auth.id = user.id",
  });
  dao.saveCollection(karmaPoints);

}, (db) => {
  // Undo changes if needed (optional)
  const dao = new Dao(db);
  ["karma_points", "medical_reports", "workouts", "food_logs", "steps"].forEach(name => {
    try {
      const collection = dao.findCollectionByNameOrId(name);
      dao.deleteCollection(collection);
    } catch (e) {}
  });
});
