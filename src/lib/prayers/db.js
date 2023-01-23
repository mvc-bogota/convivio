class MockDatabase {
    constructor() {
        this.prayers = [];
    }

    async put(params) {
        this.prayers.push(params.Item);
    }

    async scan() {
        return { Items: this.prayers };
    }
}

export default new MockDatabase();
export { MockDatabase };
