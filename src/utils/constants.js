export const base_url = 'http://localhost:8000';

export function addComma(num) {
    const finalNum = new Intl.NumberFormat().format(num);

    return finalNum;
}

// const url =
//     'https://code.highcharts.com/mapdata/countries/ke/ke-all.topo.json';
// const res = await fetch(url);
// const data = await res.json();
// console.log(data);
