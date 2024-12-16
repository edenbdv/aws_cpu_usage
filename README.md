# aws_cpu_usage

Steps to Run:
Clone the repository:

bash
Copy code
git clone https://github.com/edenbdv/aws_cpu_usage.git
cd aws_cpu_usage
Create the .env file as mentioned above under the server folder.

Install dependencies for both client and server:

bash
Copy code
cd server
npm install
cd ../client
npm install
Run the server and client:

bash
Copy code
cd server
npm start  # Starts the server on port 5000
cd ../client
npm start  # Starts the React client
Access the application at http://localhost:3000.

Important Note:
The project relies on AWS credentials stored in a .env file for the server. I intentionally did not upload this file to GitHub for security purposes.

To run the project properly, please create a .env file under the server directory with the following variables:

plaintext
Copy code
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
Replace your_aws_access_key, your_aws_secret_key, and your_aws_region with your AWS credentials and region.
