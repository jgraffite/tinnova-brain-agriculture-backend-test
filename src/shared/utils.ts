import { HttpException, HttpStatus } from '@nestjs/common';

export function throwHttpBadRequestException(
  errorMessage,
  responseParams = {},
  errorCode = HttpStatus.BAD_REQUEST,
) {
  throw new HttpException(
    {
      status: errorCode,
      error: errorMessage,
      ...responseParams,
    },
    errorCode,
  );
}

export function throwHttpFarmerNotFound() {
  throwHttpBadRequestException(
    'Nenhum fazendeiro foi encontrado',
    {},
    HttpStatus.NOT_FOUND,
  );
}
