"use strict";

const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");
const license = require("./license");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.env.adapter.promptModule.registerPrompt(
      "search-list",
      require("inquirer-search-list")
    );
  }

  _getGoProjectRoot() {
    let root = process.env.GO_PROJECT_ROOT;
    if (root) {
      return root;
    }

    root = process.env.GOPATH;
    if (root) {
      return path.join(root, "src");
    }

    const home = process.env.HOME;
    if (home) {
      return path.join(home, "go", "src");
    }

    return ".";
  }

  async prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the ${chalk.red("go-project")} generator!`));

    const answers = await this.prompt([
      {
        name: "name",
        message: "Project name",
        type: "input",
        required: true,
        validate: (input) => Boolean(input) || "cannot be set empty name",
      },
      {
        name: "author",
        message: "Project author GitHub account",
        type: "input",
        required: true,
        default: await this.user.github.username().catch(() => {
          return undefined;
        }),
      },
      {
        name: "description",
        message: "Project description",
        type: "input",
        required: true,
      },
      {
        name: "publication",
        message: "Year of the publication",
        type: "input",
        required: true,
        default: new Date().getFullYear(),
      },
      {
        name: "license",
        message: "Choose a license template",
        type: "search-list",
        required: true,
        default: "MIT",
        choices: license.list(),
      },
      {
        name: "type",
        message: "Choose a project type",
        type: "search-list",
        required: true,
        choices: ["None", "CLI", "Library"],
      },
      {
        name: "dir",
        message: "Path to generate",
        type: "input",
        required: true,
        default: (answers) =>
          path.join(
            this._getGoProjectRoot(),
            "github.com",
            answers.author || "",
            answers.name || ""
          ),
      },
    ]);
    const badgeId = encodeURIComponent(answers.license).replace("-", "--");
    const badge = `http://img.shields.io/badge/license-${badgeId}-blue.svg`;
    this.answers = Object.assign(answers, {
      license: Object.assign(license.get(answers.license), { badge: badge }),
    });
  }

  writing() {
    this.fs.write(
      this.destinationPath("LICENSE"),
      license.note(
        this.answers.license,
        this.answers.publication,
        this.answers.author,
        this.answers.name
      )
    );
    let files = [
      ["README.md.ejs", "README.md"],
      ["gitignore.ejs", ".gitignore"],
      ["Makefile.ejs", "Makefile"],
      ["golangci.yml", ".golangci.yml"],
      ["workflow-review.yml", ".github/workflows/review.yml"],
      ["workflow-test.yml.ejs", ".github/workflows/test.yml"],
      ...(this.answers.type === "CLI"
        ? [
            ["workflow-release.yml.ejs", ".github/workflows/release.yml"],
            ["goreleaser.yml.ejs", ".goreleaser.yml"],
            ["cli-main.go.ejs", `cmd/${this.answers.name}/main.go`],
          ]
        : this.answers.type === "Library"
        ? [
            ["doc.go.ejs", "doc.go"],
            ["lib-main.go.ejs", `cmd/${this.answers.name}-sample/main.go`],
          ]
        : []),
    ];

    for (let w of files) {
      if (w[0].endsWith(".ejs")) {
        this.fs.copyTpl(
          this.templatePath(w[0]),
          this.destinationPath(w[1]),
          this.answers
        );
      } else {
        this.fs.copy(this.templatePath(w[0]), this.destinationPath(w[1]));
      }
    }
  }

  install() {
    this.log("Initializing module");
    const module = `github.com/${this.answers.author}/${this.answers.name}`;
    this.spawnCommand("go", ["mod", "init", module]);
  }
};
