import https from 'https';
import chalk from 'chalk';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const APIKey = "0603e75adbfb3a7802088f56";
const url = `https://v6.exchangerate-api.com/v6/${APIKey}/latest/USD`;

const Total = (amount, rate) => {
    return (amount * rate).toFixed(2);
};

https.get(url, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const response = JSON.parse(data);

            // Ensure the response contains exchange rates
            if (!response.conversion_rates) {
                console.log(chalk.red("Error: Invalid response from API."));
                rl.close();
                return;
            }

            const rates = response.conversion_rates;

            rl.question("Enter amount (in USD '$'): ", (amount) => {
                rl.question("Enter the currency name: (e.g, INR, CAN, AFK) ", (currency) => {
                    const rate = rates[currency.toUpperCase()];

                    if (rate) {
                        console.log(`${amount} USD is approximately equal to ${Total(amount, rate)} ${currency}`);
                    } else {
                        console.log(chalk.red(`Currency "${currency}" not found.`));
                    }

                    rl.close();
                });
            });

        } catch (error) {
            console.log(chalk.red("Error parsing API response. Please try again later."));
            rl.close();
        }
    });

}).on('error', (err) => {
    console.log(chalk.red(`Error fetching data: ${err.message}`));
    rl.close();
});
