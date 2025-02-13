import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
  
  @Catch()
  export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);
  
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal Server Error';
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        message = typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message;
      }
      else if (exception instanceof Error) {
        this.logger.error(`❌ Erro inesperado: ${exception.message}`, exception.stack);
        message = exception.message || 'Erro desconhecido';
      }
  
      const errorResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message,
      };
  
      this.logger.warn(
        `[${request.method}] ${request.url} - ${JSON.stringify(errorResponse)}`
      );
  
      response.status(status).json(errorResponse);
    }
  }
  