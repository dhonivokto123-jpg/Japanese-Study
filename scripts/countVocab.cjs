const fs = require('fs');
const path = require('path');
const { lessonWords } = require('./n5CurriculumData.cjs');
require('./generateCompleteCurriculum.cjs');
const { vocab6to15 } = require('./n5Vocab6to15.cjs');
const { vocab16to25 } = require('./n5Vocab16to25.cjs');

// Merge all
for (const [lesson, items] of Object.entries(vocab6to15)) {
  lessonWords[lesson] = items;
}
for (const [lesson, items] of Object.entries(vocab16to25)) {
  lessonWords[lesson] = items;
}

let total = 0;
for (let l = 1; l <= 25; l++) {
  const count = (lessonWords[l] || []).length;
  total += count;
  console.log(`Lesson ${l}: ${count} words`);
}
console.log(`Current Total Vocab Count: ${total}`);
