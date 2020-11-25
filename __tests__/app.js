"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-go-project:app", () => {
  it("creates files for CLI", async () => {
    await helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
      name: "gen-test",
      description: "test generation kyoh86/gen-test",
      type: "CLI",
      author: "kyoh86",
    });
    assert.file(["LICENSE"]);
    assert.file(["README.md"]);
    assert.file([".gitignore"]);
    assert.file(["Makefile"]);

    assert.file([".golangci.yml"]);
    assert.file([".github/workflows/review.yml"]);
    assert.file([".github/workflows/test.yml"]);

    assert.file([".github/workflows/release.yml"]);
    assert.file([".goreleaser.yml"]);
    assert.file(["cmd/gen-test/main.go"]);

    assert.noFile(["cmd/gen-test-sample/main.go"]);
    assert.noFile(["doc.go"]);
  });

  it("creates files for Library", async () => {
    await helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
      name: "gen-test",
      description: "test generation kyoh86/gen-test",
      type: "Library",
      author: "kyoh86",
    });
    assert.file(["LICENSE"]);
    assert.file(["README.md"]);
    assert.file([".gitignore"]);
    assert.file(["Makefile"]);

    assert.file([".golangci.yml"]);
    assert.file([".github/workflows/review.yml"]);
    assert.file([".github/workflows/test.yml"]);

    assert.file(["cmd/gen-test-sample/main.go"]);
    assert.file(["doc.go"]);

    assert.noFile([".github/workflows/release.yml"]);
    assert.noFile([".goreleaser.yml"]);
    assert.noFile(["cmd/gen-test/main.go"]);
  });

  it("creates files without entrypoint", async () => {
    await helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
      name: "gen-test",
      description: "test generation kyoh86/gen-test",
      type: "None",
      author: "kyoh86",
    });
    assert.file(["LICENSE"]);
    assert.file(["README.md"]);
    assert.file([".gitignore"]);
    assert.file(["Makefile"]);

    assert.file([".golangci.yml"]);
    assert.file([".github/workflows/review.yml"]);
    assert.file([".github/workflows/test.yml"]);

    assert.noFile(["cmd/gen-test-sample/main.go"]);
    assert.noFile(["doc.go"]);

    assert.noFile([".github/workflows/release.yml"]);
    assert.noFile([".goreleaser.yml"]);
    assert.noFile(["cmd/gen-test/main.go"]);
  });
});
