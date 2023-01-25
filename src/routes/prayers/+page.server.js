import { Prayer, PrayerDao } from '$lib/prayers';
import db from '$lib/prayers/db.server.js';

async function load() {
    return {
        prayers: await new PrayerDao(db).getAllPrayers(),
    };
}

const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const prayer = new Prayer(data.get('prayerType'));
        await prayer.save(new PrayerDao(db));
    },
};

export { load, actions };
