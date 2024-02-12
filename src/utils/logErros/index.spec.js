import { createErrorLogMessage, logErrors } from ".";
import { vi } from 'vitest';

describe('log errors', () => {
  let consoleSpy;
  const mockMessage = 'Request failed';
  const mockError = { status: 404, data: { message: 'Not Found' } };

  afterEach(() => consoleSpy.mockRestore());
  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(vi.fn());
  });

  describe('logErrors', () => {
    it('logs error message and data correctly', () => {
      logErrors(mockError, mockMessage);
  
      expect(consoleSpy).toHaveBeenCalledWith(`'----ERROR----' ${mockMessage}`, {
        errorMessage: mockMessage,
        responseStatus: mockError.status,
        responseData: JSON.stringify(mockError.data),
      });
    });
  });

  describe('createErrorLogMessage', () => {
    it('should create an error log message with status and data', () => {
      const logData = createErrorLogMessage(mockError, mockMessage);
  
      expect(logData).toEqual({
        errorMessage: mockMessage,
        responseStatus: 404,
        responseData: '{"message":"Not Found"}',
      });
    });
  
    it('should create an error log message without status and data', () => {
      const logData = createErrorLogMessage(undefined, mockMessage);
  
      expect(logData).toEqual({
        errorMessage: mockMessage,
        responseStatus: 400,
      });
    });
  });
});
