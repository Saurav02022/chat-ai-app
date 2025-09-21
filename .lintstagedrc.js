module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix --ignore-pattern "!.lintstagedrc.js"',
    'prettier --write',
  ],
  '*.{json,md,css}': ['prettier --write'],
};
