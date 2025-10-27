export async function up(db, client) {
  // create index on path field
  await db.collection('images').createIndex({ path: 1 }, { background: true });
}

export async function down(db, client) {
  await db.collection('images').dropIndex('path_1');
}
