import { MongoClient, ObjectId, FindOptions } from "mongodb";

export async function connectDatabase() {
  const MONGO_USERNAME = process.env.NEXT_PUBLIC_MONGO_USERNAME;
  const MONGO_PASSWORD = process.env.NEXT_PUBLIC_MONGO_PASSWORD;
  const MONGO_CLUSTER = process.env.NEXT_PUBLIC_MONGO_CLUSTER;
  const DATABASE_NAME = process.env.NEXT_PUBLIC_DATABASE_NAME;
  const DATABASE_CONFIG = process.env.NEXT_PUBLIC_DATABASE_CONFIG;

  const CONNECTION_STRING = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${DATABASE_NAME}?${DATABASE_CONFIG}`;

  const client = await MongoClient.connect(CONNECTION_STRING);

  return client;
}

export async function insertDocument(
  client: MongoClient,
  collection: string,
  entity: any
): Promise<any> {
  const db = client.db();

  return db.collection(collection).insertOne(entity);
}

export async function getAllDocumentsForCollection(
  client: MongoClient,
  collection: string,
  sort: any,
  criteria?: any,
  options?: FindOptions<Document>
): Promise<any[]>  {
  const db = client.db();

  const documents = await db.collection(collection).find(criteria, options).sort(sort).toArray();

  return documents;
}

// export async function to get a single document from a collection
export async function getDocumentForCollectionById(
  client: MongoClient,
  collection: string,
  id: string,
  options?: FindOptions<Document>
): Promise<any | null> {
  const db = client.db();

  const document = await db
    .collection(collection)
    .findOne({ _id: new ObjectId(id) }, options);

  return document;
}

// export async function to get a single document from a collection with any criteria
export async function getDocumentForCollection(
  client: MongoClient,
  collection: string,
  criteria: any,
  options?: FindOptions<Document>
): Promise<any | null> {
  const db = client.db();

  const document = await db.collection(collection).findOne(criteria, options);

  return document;
}

// close database connection
export async function closeDatabaseConnection(client: MongoClient) {
  await client.close();
}

// update collection document by Id and return updated document
export async function updateDocumentByIdAndReturn(client: MongoClient, collection: string, id: ObjectId, updatedFields: any): Promise<any> {
  const db = client.db();

  const updatedDocument = await db.collection(collection).findOneAndUpdate(
    { _id: id },
    { $set: updatedFields }
  );

  return updatedDocument;
}