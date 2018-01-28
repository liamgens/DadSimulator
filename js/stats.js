function updateStat(statType, value) {
    let stats = Cookies.getJSON("dad");
    console.log(stats);
    switch (statType) {
        case 'HEALTH':
            stats.health += value;
            break;
        case 'HUNGER':
            stats.hunger += value;
            break;
        case 'THIRST':
            stats.thirst += value;
            break;
        case 'HAPPINESS':
            stats.happiness += value;
            break;
    }

    stats = validateStats(stats);
    Cookies.set("dad", stats);
}

function getStat(statType) {
    switch (statType) {
        case 'HEALTH':
            return Cookies.getJSON("dad").health;
        case 'HUNGER':
            return Cookies.getJSON("dad").hunger;
        case 'THIRST':
            return Cookies.getJSON("dad").thirst;
        case 'HAPPINESS':
            return Cookies.getJSON("dad").happiness;
    }
}

function validateStats(stats) {
    let correctedStats = stats;

    for (let stat in stats) {
        if (stats[stat] < MIN_STAT) {
            correctedStats[stat] = MIN_STAT;
        } else if (stats[stat] > MAX_STAT) {
            correctedStats[stat] = MAX_STAT;
        }
    }

    return correctedStats;
}