# Memorable Random Quotes
The main goal of the app is have an authentication system and once you get in the app be able to see random quotes with background images

## Requirements
* You need to have npm and ionic in your system to run the project
* You need to have mysql installed in order to see business data such as quotes and user images loaded (TODO)

## Usage
Insall ionic globally
```bash
npm install ionic -g
```

Install npm dependencies to run the express server
```bash
npm install
```

Modify the file .env to custom your own Stormpath variables and run
```bash
source .env
```

Run express
```bash
npm run dev
```

Run ionic
```bash
ionic serve -l
```