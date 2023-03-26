import { PrayerTracker, Prayer } from '$lib/prayers';

function load({ data }) {
    const prayerTracker = new PrayerTracker();
    data.prayers.forEach((prayer) => prayerTracker.addPrayer(new Prayer(prayer.type)));
    return {
        prayerTracker: prayerTracker,
    };
}

export { load };
