require('dotenv').config({ path: './.env' });

module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS === 'true',
    // slowMo: 250,
    args: ['--disable-infobars', '--window-size=1200,800'],
    defaultViewport: null
  },
  browserContext: 'default'
};
