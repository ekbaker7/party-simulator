import { Db, FindOptions, MongoClient, ObjectId, WithId } from "mongodb";

export default class BaseRepository {
  collection: string = "";
  client: MongoClient | null = null;

  /**
   * Sets the collection for the repository
   * @param collection The name of the collection to use
   */
  constructor(collection: string) {
    this.collection = collection;
  }

  /**
   * Connects to the database, assigns to this.client
   */
  connectDatabase = async (): Promise<void> => {
    const MONGO_USERNAME = process.env.NEXT_PUBLIC_MONGO_USERNAME;
    const MONGO_PASSWORD = process.env.NEXT_PUBLIC_MONGO_PASSWORD;
    const MONGO_CLUSTER = process.env.NEXT_PUBLIC_MONGO_CLUSTER;
    const DATABASE_NAME = process.env.NEXT_PUBLIC_DATABASE_NAME;
    const DATABASE_CONFIG = process.env.NEXT_PUBLIC_DATABASE_CONFIG;

    const CONNECTION_STRING = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${DATABASE_NAME}?${DATABASE_CONFIG}`;

    this.client = await MongoClient.connect(CONNECTION_STRING);
  };

  /**
   * Fetches a document by its id
   * @param id String or ObjectId of document to fetch
   * @param options (Optional) The projection options for select certain fields
   * @returns Document, if found, otherwise null
   */
  fetchById = async (
    id: string | ObjectId,
    options?: FindOptions<Document>
  ): Promise<WithId<Document> | null> => {
    if (!this.client) {
      await this.connectDatabase();
    }

    let objectId = this.convertToObjectId(id);

    const db = this.client?.db() as Db;

    return db.collection(this.collection).findOne({ _id: objectId }, options);
  };
  
  /**
   * Fetches a single document from the collection by criteria
   * @param criteria Criteria to filter by
   * @param options (Optional) FindOptions for projection
   * @returns Single document, or null if not found
   */
  fetchOne = async (
    criteria: any,
    options?: FindOptions<Document>
  ): Promise<WithId<Document> | null> => {
    if (!this.client) {
      await this.connectDatabase();
    }

    const db = this.client?.db() as Db;

    return db.collection(this.collection).findOne(criteria, options);
  };

  /**
   * Fetches all documents from a collection with optional filtering/projection/sorting 
   * @param criteria (Optional) Criteria to filter by
   * @param options (Optional) FindOptions for projection
   * @param sort (Optional) Sorting criteria
   * @returns 
   */
  fetchAll = async (
    criteria?: any,
    options?: FindOptions<Document>,
    sort?: any
  ): Promise<any[]> => {
    return this._getAllDocumentsForCollection(criteria, options, sort);
  };

  /**
   * Saves a new document to the collection
   * @param entity Entity to save
   * @returns Inserted document status
   */
  saveNewDocument = async (entity: any): Promise<any> => {
    if (!this.client) {
      await this.connectDatabase();
    }
    const db = this.client?.db() as Db;
    return db?.collection(this.collection).insertOne(entity);
  };

  /**
   * Updates a document by ID and returns updated document
   * @param id String Id or ObjectId of document to update
   * @param updatedFields Fields to update for document
   * @returns Updated document
   */
  updateDocumentByIdAndReturn = async (
    id: string | ObjectId,
    updatedFields: any
  ): Promise<any> => {
    if (!this.client) {
      await this.connectDatabase();
    }
    const db = this.client?.db() as Db;

    let objectId = this.convertToObjectId(id);

    const updatedDocument = await db
      ?.collection(this.collection)
      .findOneAndUpdate({ _id: objectId }, { $set: updatedFields });

    return updatedDocument;
  };

  /**
   * Closes database connection and sets this.client to null
   */
  closeDatabaseConnection = async (): Promise<void> => {
    await this.client?.close();
    this.client = null;
  };

  /**
   * (Internal class method) Fetches all documents from a collection with optional filtering/projection/sorting
   * @param criteria Criteria to filter by
   * @param options (Optional) The projection options for select certain fields
   * @param sort (Optional) Sort options
   * @returns Promise<any[]> Array of any type of object
   */
  _getAllDocumentsForCollection = async (
    criteria?: any,
    options?: FindOptions<Document>,
    sort?: any
  ): Promise<any[]> => {
    if (!this.client) {
      await this.connectDatabase();
    }
    const db = this.client?.db() as Db;

    let documents;
    if (sort) {
      if (options) {
        documents = await db
          .collection(this.collection)
          .find(criteria, options)
          .sort(sort)
          .toArray();
      } else {
        documents = await db
          .collection(this.collection)
          .find(criteria)
          .sort(sort)
          .toArray();
      }
    } else {
      if (options) {
        documents = await db
          .collection(this.collection)
          .find(criteria, options)
          .toArray();
      } else {
        documents = await db
          .collection(this.collection)
          .find(criteria)
          .toArray();
      }
    }

    return documents;
  };

  /**
   * Converts a string to ObjectId, if needed
   * @param id String or ObjectId to convert
   * @returns Returns object if already ObjectId, or converted string to ObjectId
   */
  convertToObjectId = (id: string | ObjectId): ObjectId => {
    return typeof id === "string" ? new ObjectId(id) : id;
  }
}
