# Problem 1: Three ways to sum to n

## Solutions

```javascript
var sum_to_n_a = function(n) {
    return (n * (n + 1)) / 2;
};

var sum_to_n_b = function(n) {
    let total = 0;
    for (let i = 1; i <= n; i++) {
        total += i;
    }
    return total;
};

var sum_to_n_c = function(n) {
    const nArray = Array.from({ length: n }, (_, i) => i + 1);
    return nArray.reduce((acc, currentNum) => acc + currentNum, 0);
};
```