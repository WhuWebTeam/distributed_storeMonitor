function f(n) {
    if (n === 1 || n === 2) {
        return 1;
    }

    let i = 3, pre = 1, beh = 1;
    while (i <= n) {
        pre = pre + beh;
        beh = pre + beh;
        i += 2;
    }
    return n % 2 ? pre : beh;
}


console.log(f(5));