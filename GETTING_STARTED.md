# Getting Started

This guide will set up your local environment.

## Prerequisite

You are running on Linux or running in a [Linux WSL](https://learn.microsoft.com/windows/wsl/install) environment.

To set up your environment we are depending on [MS Dev Box(](https://azure.microsoft.com/en-us/products/dev-box). This ensures an isolated environment and all required tools to be installed.

To install DevBox open a terminal and run the following command:

``` bash
curl -fsSL https://get.jetify.com/devbox | bash
```

## Setup Environment

To open the environment run the following command:

``` bash
devbox shell
```

this will install all the required tools in the environment.

open VSCode:

```bash
code .
```

or 

```bash
devbox run dev
```

## Extra's

To run tests

```bash
qowaiv test
```

to build

```bash
qowaiv build
```

to publish

```bash
qowaiv publish v1.0.0
```
