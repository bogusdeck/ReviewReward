
# ReviewReward

ReviewReward is a platform designed to ensure the authenticity of online reviews using advanced AI and machine learning techniques. It aims to combat fake reviews by providing users with trustworthy feedback on products and services.

## Features

- **Authenticity Verification:** Utilizes AI to detect and remove fake reviews, ensuring credibility.
- **Responsive Interface:** Built with Next.js and styled using Tailwind CSS for a seamless user experience across devices.
- **Secure Authentication:** Integrates Google Authentication with Firebase for robust user login and registration.
- **Scalable Database:** Reviews are stored efficiently in Firebase, capable of handling large volumes of data.
- **Review Integrity:** Implements dual-step verification with machine learning models and the Cohere large language model to validate reviews before posting.

## Technologies Used

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Firebase (Authentication, Database)
- **Machine Learning:** Flask server for model hosting, Cohere large language model

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/bogusdeck/ReviewReward.git
   ```
   
2. Install dependencies:
   ```
   cd ReviewReward
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the app.

5. Start the python server 
   ```
   python -m venv .venv
   ```
6. install the python libraries
   ```
   python -m venv .venv
   ```

7. start the python server 
   ```
   python app.py
   ```


## Usage

- Register or login using your Google account.
- Submit reviews for products or services.
- Earn and redeem reward points based on genuine reviews.
- Explore brand insights and search for reviews securely.

## Contributing

Contributions are welcome! Fork the repository and submit a pull request with your improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
