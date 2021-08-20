export default function calculateMonthSpend(entries) {
    let total = 0;
    let pastMonth = new Date();
    pastMonth.setMonth(pastMonth.getMonth() - 1);
    entries.entries.map(entry => {
        if (pastMonth.getTime() < new Date(parseInt(entry.date)).getTime()) {
            total += entry.price;
        }
    });
    return total
}