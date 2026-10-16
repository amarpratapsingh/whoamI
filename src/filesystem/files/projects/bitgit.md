# BitGit — Distributed Git-Compatible VCS from Scratch

A lightweight, node-based implementation of a Git-compatible version control system written in JavaScript (ES Modules). BitGit implements the core mechanics of Git: content-addressable object storage, index staging area, tree hashing, commit graphs, branch management, and revisions checkout.

## Tech Stack
- Runtime: Node.js (v16+, ES Modules)
- Hashing & Security: SHA-1 cryptographic digest for object IDs
- Storage: Custom content-addressable filesystem database
- Architecture: Git plumbing and porcelain command separation
- Testing: Automated unit test suite verifying object creation and state diffing

## Core Architecture & Data Models
- Repository Root (`.bg/`): Metadata store and configuration directory.
- Object Database (`.bg/objects/`): Content-addressable store. Files, trees, and commit records are hashed using SHA-1. The first 2 characters form the subdirectory shard (e.g. `.bg/objects/4b/`), and the remaining 38 characters form the object file name.
- Index / Staging Area (`.bg/index.json`): JSON representation mapping tracked working directory file paths to staged SHA-1 object hashes.
- References (`.bg/refs/head/<branch>` & `.bg/HEAD`): Branch heads point to latest commit SHA-1; HEAD points to current active branch or detached commit.
- Configuration (`.bg/config.json`): User identity (`user.name`, `user.email`) attached to commit author signatures.

## Supported Commands
- `init [--bare]`: Initializes a standard `.bg/` repository or bare repository.
- `config`: View or set repository author configuration.
- `add <files...>`: Stages files, computes SHA-1 blobs, and updates index.json.
- `commit -m <msg>`: Creates tree objects and commit DAG snapshot.
- `status`: Three-way diff between working tree, index, and HEAD.
- `diff [--staged]`: Inspect unstaged vs staged code modifications.
- `log`: Traverse commit history DAG back to root commit.
- `branch & checkout`: Branch creation, deletion, and working tree restoration.

Repository: https://github.com/amarpratapsingh/BitGit
