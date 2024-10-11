# FoodHub (RAITE 2024 iThink Hackathon)

## Description

**FoodHub** is a system that aims to create a solution for the United Nation's
SDG #2, "_Zero Hunger_". This system is intended to be hosted on
[The Internet Computer](https://internetcomputer.org/) (ICP) blockchain network.

## Requirements

This system has been tested on the following platforms:

- Operating System
  - Windows Subsystem for Linux (WSL) [Kali/Ubuntu]
  - Fedora Workstation 40
- Dependencies
  - Python v3.10.7
    - Kybra v0.5.\*
  - NodeJS v16.0.0+
    - NPM v7.0.0+

## Development Setup

> [!NOTE]
>
> To start developing on a Windows environment, you have to install the
> [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/about)
> (WSL) feature. On later versions of Windows, you can install WSL by
> running a single command:
>
> ```powershell
> wsl --install
> ```
>
> By default, this will install the Ubuntu distribution of WSL. Depending
> on your machine, you might have to perform extra steps to install the
> feature. Read Microsoft's detailed documentation on how to install WSL [here](https://learn.microsoft.com/en-us/windows/wsl/install).

### Setting Up ICP DFX

`dfx` is the command-line interface for the [IC SDK](https://wiki.internetcomputer.org/wiki/Main_Page).

The command below will install a binary compatible with your operating system,
and add it to `/home/<username>/.local/share/dfx/`. It is recommended to
choose the default installation.

```bash
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

### Setting Up The Python Environment

Make sure that you have Python v3.10.7 installed on your system. This version of
Python is already deprecated and therefore not available in the repositories,
so we have to compile it ourselves. `pyenv` makes this process easier.

```bash
# Install build dependencies
# More info: https://github.com/pyenv/pyenv/wiki#suggested-build-environment
sudo apt update && sudo apt install \
    curl gcc git make xz-utils \
    libbz2-dev libffi-dev liblzma-dev libncursesw5-dev \
    libreadline-dev libssl-dev libsqlite3-dev libxml2-dev \
    libxmlsec1-dev tk-dev zlib1g-dev

# Install pyenv
curl https://pyenv.run | bash

# Set up pyenv (assuming you are using bash)
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc

# Reload environment
source ~/.bashrc

# Install Python 3.10.7
pyenv install 3.10.7 --verbose
```

> [!WARNING]
>
> There might be some missing packages/modules, resulting to fatal errors.
>
> The missing packages/modules may vary, so just search them out to find
> what package name they belong to. An example of this occurence is...
>
> ```text
> Error: missing module _ssl
> ```
>
> `_ssl` belongs to `libssl-dev` package for Debian-based systems such as
> Ubuntu. To fix this problem, run:
>
> ```bash
> sudo apt install libssl-dev
> # or
> sudo apt-get install libssl-dev
> ```

To make sure that all developers have the same environment, run the following commands:

```bash
cd FoodHub/
pyenv virtualenv 3.10.7 foodhub  # Create a new virtual environment running v3.10.7
pyenv activate foodhub           # Activate the newly-created virtual environment
pip install -r requirements.txt  # Install dependencies
```

## Local Deployment

First, navigate the terminal to the project directory. For freshly
setup environments first check if there is a problem with `dfx` by running...

```bash
dfx diagnose
```

Ensure that the Node modules are installed. If not, or if it is missing some
of the dependencies, run the command while inside the directory where the
`package.json` is located:

```bash
npm install
```

> [!NOTE]
> Ensure that the virtual environment is active.
> If not, locate your virtual environment and activate it using...
>
> ```bash
> pyenv activate foodhub
> ```

Run the replica server,

```bash
dfx start
# or
dfx start --background
```

Then run:

```bash
dfx deploy
```
