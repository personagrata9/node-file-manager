import { OPERATION_ERROR_MESSAGE, INVALID_INPUT_MESSAGE, INVALID_FILE_NAME_MESSAGE } from '../consts/messages.js';

export class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

export class InputError extends CustomError {
  constructor(message) {
    super(`${INVALID_INPUT_MESSAGE}: ${message}!`);
    this.name = 'InputError';
  }
}

export class OperationError extends CustomError {
  constructor(message) {
    super(`${OPERATION_ERROR_MESSAGE}: ${message}!`);
    this.name = 'OperationError';
  }
}

export class DirentNotExistError extends OperationError {
  constructor(direntPath) {
    super(`'${direntPath}' doesn't exist`);
    this.name = 'DirentNotExistError';
    this.direntPath = direntPath;
  }
}

export class FileNameIsTakenError extends OperationError {
  constructor(fileName) {
    super(`name '${fileName}' is already taken, please choose a different name`);
    this.name = 'FileNameIsTakenError';
    this.fileName = fileName;
  }
}

export class FileAlreadyExistError extends OperationError {
  constructor(fileName, dirPath) {
    super(`file '${fileName}' is already exist in directory '${dirPath}'`);
    this.name = 'FileAlreadyExistError';
    this.fileName = fileName;
    this.dirPath = dirPath;
  }
}

export class NotDirectoryError extends OperationError {
  constructor(dirPath) {
    super(`'${dirPath}' is not a directory`);
    this.name = 'NotDirectoryError';
    this.dirPath = dirPath;
  }
}

export class NotFileError extends OperationError {
  constructor(filePath) {
    super(`'${filePath}' is not a file`);
    this.name = 'NotFileError';
    this.filePath = filePath;
  }
}

export class PermissionError extends OperationError {
  constructor() {
    super('not permitted');
    this.name = 'PermissionError';
  }
}

export class InvalidFileNameError extends OperationError {
  constructor() {
    super(INVALID_FILE_NAME_MESSAGE);
    this.name = 'InvalidFileNameError';
  }
}
