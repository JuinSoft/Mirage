
# Mirage

**Mirage** is a decentralized, cross-chain transactional email service built with Next.js. This project leverages blockchain technology to provide secure and verifiable email transactions across multiple blockchain networks.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/), or [bun](https://bun.sh/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JuinSoft/Mirage
   cd mirage
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

### Running the Development Server

Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create an optimized production build:

   ```bash
   npm run build
   # or
   yarn build
   # or
   pnpm build
   # or
   bun build
   ```

### Starting the Production Server

After building the project, you can start the production server:

   ```bash
   npm start
   # or
   yarn start
   # or
   pnpm start
   # or
   bun start
   ```

## Project Structure

- **`src/app/layout.js`**: Defines the root layout of the application, including global styles and font imports.
- **`src/app/page.js`**: Main page component that handles the email interface and interactions.
- **`src/app/config/schema.js`**: Contains the schema definition for the decentralized email attestation service.
- **`src/app/config/contract.js`**: Contains the contract ABI and addresses for interacting with the blockchain.
- **`src/app/config/sendFileToIPFS.js`**: Utility functions for interacting with IPFS.
- **`tailwind.config.js`**: Tailwind CSS configuration.
- **`postcss.config.mjs`**: PostCSS configuration.

## Features

### Decentralized Email Service

Mirage allows users to send and receive emails in a decentralized manner. Each email is stored on the blockchain, ensuring security and immutability. The email data includes sender and receiver addresses, subject, content, and optional attachments.

### Token Integration and Sharing

Users can attach tokens to their emails, enabling transactional capabilities. This feature is particularly useful for sending payments or other digital assets along with the email. Mirage supports token sharing across multiple blockchain networks, making it a versatile tool for decentralized finance (DeFi) applications.

### IPFS Integration

Mirage uses IPFS (InterPlanetary File System) to store email attachments. This ensures that attachments are stored in a decentralized manner, providing redundancy and security.

### Contact Management

Users can manage their contacts within the application. Contacts can be added, verified, and associated with specific blockchain addresses.

### Network Switching

Mirage supports multiple blockchain networks, including Ethereum and Polygon. Users can switch between networks seamlessly within the application.

### Authentication

The application uses Dynamic Labs SDK for authentication, allowing users to log in with their blockchain wallets.

### Real-time Notifications

Mirage provides real-time notifications for various actions, such as receiving a new email or successfully sending an email.

## Fonts

This project uses icons and fonts provided by [nounsDAO](https://nouns.center/assets) loaded locally:

- **Silkscreen Regular**: Regular font loaded from `./fonts/Silkscreen-Regular.ttf`.
- **Silkscreen Bold**: Bold font loaded from `./fonts/Silkscreen-Bold.ttf`.

## Environment Variables

Ensure you have the necessary environment variables set up in a `.env` file. Refer to `next.config.mjs` for the required variables.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [IPFS](https://ipfs.io/)
- [Ethers.js](https://docs.ethers.io/v5/)