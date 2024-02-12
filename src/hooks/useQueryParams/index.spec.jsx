import { renderHook } from '@testing-library/react';
import { MemoryRouter, useLocation, useSearchParams } from 'react-router-dom';
import { useQueryParams } from '.';
import { vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual, 
    useLocation: vi.fn(),
    useSearchParams: vi.fn()
  }
});

const setSearchParams = vi.fn();
useSearchParams.mockReturnValue([null, setSearchParams]);

describe('useQueryParams', () => {
  it('returns query parameters', () => {
    useLocation.mockReturnValueOnce({ search: '?foo=bar&baz=qux' });
    const { result } = renderHook(() => useQueryParams(), { wrapper: MemoryRouter });
  
    expect(result.current.querys).toEqual({ foo: 'bar', baz: 'qux' });
  });

  it('set the new query queries', () => {
    useLocation.mockReturnValueOnce({ search: '' });
    const { result } = renderHook(() => useQueryParams(), { wrapper: MemoryRouter });
  
    result.current.setQuery({ newParam: 'newValue' });
    expect(setSearchParams).toHaveBeenCalledWith({ newParam: 'newValue' });
  });
})
