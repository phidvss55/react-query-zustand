## NOTE

Using Node version **>=v18.12.1**
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
 
## Project structure
`src/common`: contains shared files

`src/configs`: contains configs files

`src/migrations`: contains migrations files if has

`src/script`: contains script files if has: run manually on staging or production environment

`src/modules`: contains modules of the app

### Each **module** include:
`[module]/controllers`: controller files

`[module]/dtos`: controller files which is validate and transform incoming data from request

`[module]/entities`: entity class mapper database table

`[module]/guards`: protection files: authen,...

`[module]/services`: services files writing business logic, working with database

`[module]/strategies`: strategies for passport authen