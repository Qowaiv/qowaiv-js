# Getting Started

This guide will setup your local environment.

## Prerequisite

You are running on linux or running in a linux wsl environment.

To setup your environment we are depending on devbox to have an isolated environment and all required tools are pre installed

To install devbox open a terminal and run the following command

```bash
curl -fsSL https://get.jetify.com/devbox | bash
```

## Setup Environment

To open the environment run the following command

```bash
devbox shell
```

this will install all the required tools in the environment.

open the vscode

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
