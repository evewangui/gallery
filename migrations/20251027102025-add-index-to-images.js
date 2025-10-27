export async function up(db, client) {
  // ensure name is indexed for faster lookups
  await db.collection('images').createIndex({ name: 1 }, { background: true });
}

export async function down(db, client) {
  await db.collection('images').dropIndex('name_1');
}
