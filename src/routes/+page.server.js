// Mock database object
// Change this to a real connection once we have a database
const db = {
    prayers: 0,
    getPrayers: function () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.prayers);
            }, 100);
        });
    },
};

async function load() {
    // Simulate a database call
    return {
        currentPrayers: await db.getPrayers(),
    };
}

const actions = {
    default: async () => {
        db.prayers++;
    },
};

export { load, actions };
