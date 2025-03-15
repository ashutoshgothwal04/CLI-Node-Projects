// import https from 'https'
// import chalk from 'chalk'
// import { json } from 'stream/consumers'

// const RandomJoke = ()=>{
//     const url = 'https://official-joke-api.appspot.com/random_joke'
//     https.get(url, (res)=>{
//         const data = "";
//         res.on('data', (chunk)=>{
//             data += chunk;
//         })
//         res.on('end', ()=>{
//             const joke = json.parse(data);
//             console.log('here is ur random joke');
//             console.log(chalk.orange(`${joke.setup}`));
//             console.log(chalk.green.bgBlue.bold(`${joke.punching}`));
//         })
//     })
// }

// RandomJoke();

import https from 'https'
import chalk from 'chalk'

const getRandomJoke = async () => {
  const url = "https://official-joke-api.appspot.com/random_joke"
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const joke = JSON.parse(data);
          resolve(joke);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
};

const printJoke = async () => {
  try {
    const joke = await getRandomJoke();
    console.log('Here is your random joke:');
    console.log(chalk.orange(`${joke.setup}`));
    console.log(chalk.green.bgBlue.bold(`${joke.punchline}`));
  } catch (error) {
    console.error('Failed to fetch joke:', error);
  }
};

printJoke();