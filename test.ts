const number = [12, 2, 4, 8, 8];

const ans = number.reduce((val, next) => {
  return val + next;
});

console.log("This is ans", ans);
