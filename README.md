# Image Uploader

## Table of Contents

1. [About The Project](#about-the-project)
2. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
4. [Roadmap](#roadmap)
5. [Contribution](#contribution)
6. [License](#license)
7. [Contact](#contact)
8. [Acknowledgements](#acknowledgements)

## About The Project

Image Uploader strives to be a private media sharing platform for events

## Getting Started

This project specifically uses [DigitalOcean S3-compatible Spaces](https://docs.digitalocean.com/products/spaces/) object storage service.

### Prerequisites

This project has a few prerequisites that you must install in order to get it running locally. If you want to do it the easy (Docker) way then all you need to get started are Docker and Docker Compose V2. If you need to customize your setup for whatever reason there is a section below for The Harder Way.

#### Environment Variables

Those'll go here as I get to 'em.

#### The Docker Way

1. Clone the repository with

HTTPS
  ```bash
  git clone https://github.com/josue-codes/image_uploader.git
  ```

or SSH
   ```bash
   git clone git@github.com:josue-codes/image_uploader.git
   ```

2. Navigate to the project directory
  ```bash
  cd image_uploader
  ```

3. Launch the Docker services.
   ```bash
   docker compose up --build -d
   ```

#### The Harder Way

I won't be providing a full guide to get you up and running, if you are choosing this path it's because you know what you are doing and have specific reason to do so.

#### Front-End

The front-end of this project is built with React, and it uses the react-router-dom library for routing.

- You'll need Node.js and npm installed to manage the front-end dependencies. You can download Node.js and npm from the [official site](https://nodejs.org/). After installation, you can verify the installation by running the following commands in your terminal:
   ```bash
   node -v
   npm -v
   ```

- You will also need to install the React and react-router-dom libraries. After cloning the repository and navigating to the project directory, you can install them using npm:
   ```bash
   npm install react react-dom react-router-dom
   ```

#### Back-End

The back-end of this project is built with Python using the FastAPI framework.

- You'll need Python 3.11 installed. You can download it from the [official site](https://www.python.org/downloads/). After installation, verify the installation by running the following command in your terminal:
   ```bash
   python --version
   ```

- You'll also need to install FastAPI and a server to run it, such as Uvicorn. It's recommended to first create a virtual environment. After that, you can install FastAPI and Uvicorn using pip, Python's package installer:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows, use `env\Scripts\activate`
   pip install fastapi uvicorn
   ```

After you have these prerequisites installed, you should be able to run the project locally. 
Please adjust the instructions based on the specific requirements of your project, such as other dependencies or environment-specific instructions.

## Roadmap

This section can list any upcoming, planned, or desired features.

## Contribution

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some Amazing Feature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Joshua Andujar - [josue@josue.codes](mailto:josue@josue.codes) 

## Acknowledgements

Thanks to [The Net Ninja](https://www.youtube.com/@NetNinja) for his awesome playlist on React that got me up and running in just a day's time.

- [Follow him on GitHub](https://github.com/iamshaunjp)
- [Full Modern React Tutorial](https://youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d)
