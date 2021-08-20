export default function calculateDaySpend(entries) {
    let dayTot = 0
    entries.entries.map(entry => {
        if (new Date().toLocaleDateString() == new Date(parseInt(entry.date)).toLocaleDateString()) {
            dayTot += entry.price;
        }
    });
    return dayTot;
}