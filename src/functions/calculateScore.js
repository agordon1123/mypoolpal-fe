
export const calculateScore = reading => {
    const { pH, chlorine, alkalinity, salinity } = reading;

    let score = 100;
    score -= scorePh(pH);
    score -= scoreChlorine(chlorine);
    score -= scoreAlkalinity(alkalinity);
    if (salinity !== undefined) {
        score -= scoreSalinity(salinity);
    }
    return Math.round(score);
}

const scorePh = pH => {
    // checks pH entered against ideal range
    // totals 5% loss per .1pH 7.0 > x < 8.0
    // out of those bounds adds 10% loss per .1pH
    let total = 0;
    if (pH <= 7.3) {
        // acidic
        if (pH >= 7.0) {
            total += (7.4 - pH) * 50;
        }
        if (pH < 7.0) {
            total += 15;
            total += (7 - pH) * 100;
        }
    } else {
        if (pH >= 7.7) {
            //basic
            if (pH <= 8) {
                total += (pH - 7.6) * 50;
            }
            if (pH > 8) {
                total += 20;
                total += (pH - 8) * 100;
            }
        }
    }
    return total;
}

const scoreChlorine = chlorine => {
    // checks the chlorine against the ideal range
    // totals 5% loss per 1ppm < 2 
    // totals 5% loss per 1ppm 4 < x < 6
    // totals 10% loss per 1ppm > 6
    let total = 0;
    
    if (chlorine < 2) { // low
        total += (2 - chlorine) * 10;
    } else if (chlorine > 4) { // high
        if (chlorine <= 6) {
            total += (chlorine - 4) * 5;
        }
        if (chlorine > 6) {
            total += 10;
            total += (chlorine - 6) * 10;
        }
    }
    return total;
}

const scoreAlkalinity = alkalinity => {
    // totals 5% loss per 10ppm x < 80 || x > 120
    let total = 0;
    if (alkalinity < 80) {
        total += (80 - alkalinity) * .5;
    } else if (alkalinity > 120) {
        total += (alkalinity - 80) * .5;
    }
    return total;
}

const scoreSalinity = salinity => {
    // totals 5% loss per 100ppm 3600 > x < 2800
    let total = 0;
    if (salinity < 2800) {
        total += (2800 - salinity) * .05;
    } else if (salinity > 3600) {
        total += (salinity - 3600) * .05;
    }
    return total;
}