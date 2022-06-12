# file-manager

node version: v16.15.1

To start app use script:

```bash
npm run start -- --username=your_username
```

If there are spaces in commands arguments (file or directory name or path), please wrap the argument in double quotes.

To close app press `ctrl+c` or sent `.exit` command

List of operations and their syntax:

- Navigation & working directory (nwd)
  - Go upper from current directory:
  ```bash
  up
  ```
  - Go to dedicated folder from current directory:
  ```bash
  cd path_to_directory
  ```
  - List all files and folders in current directory and print it to console:
  ```bash
  ls
  ```
- Basic operations with files
  - Read file and print it's content in console:
  ```bash
  cat path_to_file
  ```
  - Create empty file in current working directory:
  ```bash
  add new_file_name
  ```
  - Rename file:
  ```bash
  rn path_to_file new_filename
  ```
  - Copy file:
  ```bash
  cp path_to_file path_to_new_directory
  ```
  - Move file:
  ```bash
  mv path_to_file path_to_new_directory
  ```
  - Delete file:
  ```bash
  rm path_to_file
  ```
- Operating system info (prints following information in console)
  - Get EOL (default system End-Of-Line)
  ```bash
  os --EOL
  ```
  - Get host machine CPUs info
  ```bash
  os --cpus
  ```
  - Get home directory:
  ```bash
  os --homedir
  ```
  - Get current _system user name_
  ```bash
  os --username
  ```
  - Get CPU architecture for which Node.js binary has compiled
  ```bash
  os --architecture
  ```
- Hash calculation
  - Calculate hash for file and print it into console
  ```bash
  hash path_to_file
  ```
- Compress and decompress operations
  - Compress file (using Brotli algorithm)
  ```bash
  compress path_to_file path_to_destination_file
  ```
  - Decompress file (using Brotli algorithm)
  ```bash
  decompress path_to_file path_to_destination_file
  ```
