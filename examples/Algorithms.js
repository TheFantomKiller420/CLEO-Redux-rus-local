/// <reference path=".config/sa.d.ts" />

function binarySearch(sortedArray, key){
    let start = 0;
    let end = sortedArray.length - 1;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);

        if (sortedArray[middle] === key) {
            return "Index: " + middle + "; content: " + sortedArray[middle];
        } else if (sortedArray[middle] < key) {
            start = middle + 1;
        } else {
            end = middle - 1;
        }
    }
    return -1;
}

function linearSearch(arr, key){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === key){
            return "Index: " + i + "; content: " + arr[i];
        }
    }
    return null;
}

function bubbleSort(arr) {
    for (let j = arr.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
    }
    return arr;
}

function gcd(a, b) {
	if (a === 0)
		return Math.abs(b);
	if (b === 0)
		return Math.abs(a);
	for ( ; ; )
		if ((a %= b) === 0)
			return Math.abs(b);
		else if ((b %= a) === 0)
			return Math.abs(a);
}

function GCDBinary(a, b) {
	var factor = 1;
	while (true) {
		if (a == b)
			if (a == 0)
                throw 'GCD(0, 0)'
			else
                return factor * a;
		if (a == 0)
            return factor * b;
		if (b == 0)
            return factor * a;
		if (a == 1 || b == 1)
            return factor;
		if (!(a & 1) && !(b & 1)){
			factor <<= 1;
			a >>= 1;
			b >>= 1;
		}
		else if (!(a & 1))
            a >>= 1;
		else if (!(b & 1))
            b >>= 1;
		else if (b > a)
           b = (b - a) >> 1;		
		else
            a = (a - b) >> 1;
	}
}

// showTextBox(binarySearch([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100], 56));

// showTextBox(linearSearch(["big", 5, 50, "small", false, 15.7], false));

// showTextBox(bubbleSort([25000,6,45,5462,4745,247,3,4688,7,5994]));

// showTextBox(gcd(8, 4));

// showTextBox(GCDBinary(5, 10));