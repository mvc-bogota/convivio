import { Prayer, PrayerDao } from '$lib/prayers';
import db from '$lib/server/db.js';

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
