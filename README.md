# BERT Faq Classification - dashboard frontend

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/NicolaMassarenti/fe-dashboard-bert-faqclass)
[![HitCount](http://hits.dwyl.com/NicolaMassarenti/fe-dashboard-bert-faqclass.svg)](http://hits.dwyl.com/NicolaMassarenti/fe-dashboard-bert-faqclass)

Welcome in the repository of the front-end dashboard for the _bert-faqclass_ project! This repository contains the code to set-up a dashboard to control the knowledge base of your AI chatbot.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Before to install the software make sure you already have installed:

- [Node.js](https://nodejs.org/): an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser.
- [npm](https://www.npmjs.com/): the world's largest software registry. It contains over 800,000 code packages.

### Installing

It's easy! To download the packages and it's dependencies you need to open your terminal in the root of this project and run:

```bash
npm install
```

The `npm` package manager will create the folder _node\_modules_ and download into all the dependencies. The packages that will be downloaded are those of file _package-lock.json_.

## Local development and running tests

You can run a local server for development with the command:

```bash
npm run serve
```

This will set-up a local development server with the hot-realoads feature to immediately check the result of your tests/implementations. Once the server is set-up, you will see displayed the local and remote url (e.g. Local: `http://localhost:8080/`, Network: `http://192.168.178.52:8080/`).

To enforce the code to have clear consistent coding convention and to "spot" some bugs, run the following command:

```bash
npm run lint
```

This will highlight some errors and criticalities.

## Deployment and production build

To create a production build you need to run the following command:

```bash
npm run build
```

## Built With

- [Node.js](https://nodejs.org/) - The Javascript runtime environment to execute javascript outside of a browser
- [npm](https://www.npmjs.com/) - The package manager to download the dependencies
- [Vue.js](https://vuejs.org/) - The Javascript framework for front-end development

## Authors

- **Nicola Massarenti**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Thanks to [Bruno Pistone](https://github.com/bp91) for having introduced me to Vue.js.
