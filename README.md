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

| Vulnerability Type                     | Description                                                                                                                                                                      | Location                                                                      | PoC Command                                                                                                                        |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| Cross Site Scripting (XSS)             | The `/hello` endpoint generates page output in code. It expects a name as a parameter to say `"Hello, $name"` and concatenates the user input to the output without escaping it. | ``res.send(`Hello, ${req.query.name}`)``                                      | <http://localhost:8080/hello?name=%3Cscript%3Ealert(1)%3C/script%3E>                                                               | 
| Cross Site Scripting (XSS)             | The `/view` endpoint uses a template engine to say `"Hello, $name"` and misuses template syntax, leaving the user input unescaped.                                               | `p!= 'Hello, ' + name`                                                        | <http://localhost:8080/view?name=%3Cscript%3Ealert(1)%3C/script%3E>                                                                |
| Hardcoded credentials                  | There are secrets in the code committed to the repository                                                                                                                        | `POSTGRES_PASSWORD=mysecretpassword`<br/><br/>`password: "mysecretpassword",` | N/A                                                                                                                                |
| SQL Injection (SQLi)                   | The SQL query is constructed using string concatenation instead of using a parameterized query                                                                                   | ``client.query(`select * from users where id = ${req.params.id}`)``           | <http://localhost:8080/user/1;drop%20table%20users></br></br>`sqlmap -u localhost:8080/user/1 --all`                               |

### Other issues

* There is at least one unused variable
* The project has no tests
* A few `var` instead
  of `const` ([ESlint rule: `no-var`](https://eslint.org/docs/rules/no-var))
* Style is inconsistent. E.g. a [Standard Style](https://standardjs.com/) linter
  would complain.

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
npm run start
```
