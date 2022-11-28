/** @type {import('next').NextConfig} */
if (!process.env.WORDPRESS_API_URL) {
    throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
    `);
}

const path = require('path')
module.exports = {
    images: {
        domains: [
            'localhost', // Valid WP Image domain.
            '0.gravatar.com',
            '1.gravatar.com',
            '2.gravatar.com',
            'secure.gravatar.com',
            'via.placeholder.com',
        ],
    },
    trailingSlash: false,
	// webpackDevMiddleware: config => {
	// 	config.watchOptions = {
	// 		poll: 1000,
	// 		aggregateTimeout: 300
	// 	}

	// 	return config
	// },
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	}
};