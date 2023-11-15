export function useInitializeData(fetchedData, duration) {
    let multiplier;

    if (duration === 'day') {
        multiplier = 1;
    } else if (duration === 'week') {
        multiplier = 1 * 7;
    } else if (duration === 'month') {
        multiplier = 1 * 7 * 4;
    } else {
        multiplier = 1 * 7 * 4 * 12;
    }

    const {
        travel,
        screening,
        citizens_positive_cases,
        citizens_negative_cases,
        foreigners_positive_cases,
        foreigners_negative_cases,
    } = fetchedData;

    const citizensTested = citizens_positive_cases + citizens_negative_cases;
    const foreignersTested =
        foreigners_positive_cases + foreigners_negative_cases;
    const totalTested = citizensTested + foreignersTested;

    return {
        travel,
        screening,
        citizensTested,
        foreignersTested,
        totalTested,
        citizens_negative_cases,
        citizens_positive_cases,
        foreigners_negative_cases,
        foreigners_positive_cases,
    };
}
