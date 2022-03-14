# A sample application with known vulnerabilities - JavaScript, Express

A sample application with known issues for testing various linters, scanners,
and scan automation.

This project uses:

| Component   | In Use                                                                                              | 
|-------------|-----------------------------------------------------------------------------------------------------|
| Platform    | [NodeJS](https://nodejs.org/)                                                                       |
| Language(s) | JavaScript ([ECMAScript](https://www.ecma-international.org/publications-and-standards/standards/)) |
| Build       | [npm](https://www.npmjs.com/)                                                                       |
| Framework   | [Express](https://expressjs.com/)                                                                   |

## Security issues

| Vulnerability Type | Description | Location | PoC Command |
|--------------------|-------------|----------|-------------|
| --                 | --          | --       | --          |

### Other issues

* The project has no tests

## Running this code

**NOTE: This project contains security vulnerabilities and should be only run in
testing purposes.**

Requirements:
* NodeJS
* Docker

To run the code locally:

```shell
# Clone the project
git clone https://github.com/the-scan-project/tsp-vulnerable-app-nodejs-express.git
cd tsp-vulnerable-app-nodejs-express

# Install dependencies
npm i

# Start the database container
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres

# Start the application
PGUSER=postgres PGPASSWORD=mysecretpassword PGDATABASE=postgres npm run start
```
