import { FAUNADB_SECRET_KEY } from '$env/static/private';
import faunadb from 'faunadb';

const q = faunadb.query;

class Database {
    constructor() {
        this.client = new faunadb.Client({
            secret: FAUNADB_SECRET_KEY,
        });
    }

    async put({ tableName, data }) {
        return this.client.query(q.Create(q.Collection(tableName), { data }));
    }

    async getAll({ tableName }) {
        const result = await this.client.query(
            q.Map(
                q.Paginate(q.Documents(q.Collection(tableName)), { size: 1000 }),
                q.Lambda((x) => q.Get(x))
            )
        );
        return result.data.map((item) => item.data);
    }
}

class MockDatabase {
    constructor() {
        this.prayers = [];
    }

    async put(params) {
        this.prayers.push(params.Item);
    }

    async getAll() {
        return { Items: this.prayers };
    }
}

export default new Database();
export { MockDatabase, Database };
