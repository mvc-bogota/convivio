/*!
 * This module is in charge of the prayer application.
 *
 * The idea is that we can keep track of the different types of prayers
 * that people can offer for convivio, give the user the option of select a prayer
 * thay did and add an offering of that type. Then we display how many prayers of each
 * type have been offered. We show the number and display a jar with marbles in it.
 * Each marble represents a prayer and the color of the marble represents the type of prayer.
 *
 * Each jar can contain only 150 marbles so once the jar is full we must display it as full
 * in the background and display a new jar with the new prayers.
 *
 * Convivio's color palette:
 *  colors = ['#1855B3', '#506481', '#67DAE5', '#03a9f4', '#EC8C6C', '#B42C2C'];
 */

const prayerTypes = {
    mass: {
        label: 'Misa',
        color: '#1855B3',
    },
    rosary: {
        label: 'Rosario',
        color: '#67DAE5',
    },
    adoration: {
        label: 'Adoración al santísimo',
        color: '#EC8C6C',
    },
    sacrifice: {
        label: 'Sacrificio de algo que te cuesta',
        color: '#B42C2C',
    },
    others: {
        label: 'Otros',
        color: '#506481',
    },
};

class Prayer {
    constructor(type) {
        this.type = type;
    }

    getLabel() {
        return prayerTypes[this.type].label;
    }

    getColor() {
        return prayerTypes[this.type].color;
    }

    async save(prayerDao) {
        return await prayerDao.addPrayer(this);
    }
}

class Jar {
    constructor() {
        this.prayers = [];
    }

    addPrayer(prayer) {
        this.prayers.push(prayer);
    }

    isFull() {
        return this.prayers.length === 150;
    }
}

class PrayerTracker {
    constructor() {
        this.jars = [];
        this.currentJar = new Jar();
        this.jars.push(this.currentJar);
    }

    addPrayer(prayer) {
        this.currentJar.addPrayer(prayer);
        if (this.currentJar.isFull()) {
            this.currentJar = new Jar();
            this.jars.push(this.currentJar);
        }
    }

    getPrayersCount() {
        let count = 0;
        for (const jar of this.jars) {
            count += jar.prayers.length;
        }
        return count;
    }

    getPrayersCountByType(type) {
        let count = 0;
        for (const jar of this.jars) {
            for (const prayer of jar.prayers) {
                if (prayer.type === type) {
                    count++;
                }
            }
        }
        return count;
    }
}

class PrayerDao {
    constructor(database) {
        this.database = database;
        this.tableName = 'Prayers';
    }

    async getAllPrayers() {
        const result = await this.database.getAll({
            tableName: this.tableName,
        });
        const resultData = result.map((item) => item.data);
        return resultData;
    }

    async addPrayer(prayer) {
        await this.database.put({
            tableName: this.tableName,
            data: {
                ...prayer,
                datetime: new Date().toISOString(),
            },
        });
    }
}

export { Prayer, PrayerTracker, PrayerDao, prayerTypes };
