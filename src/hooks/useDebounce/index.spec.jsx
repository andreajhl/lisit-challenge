import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useDebounce } from '.';

const callback = vi.fn();

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

describe('useDebounce', () => {
  it('executes the callback when the delay ends', () => {
    const { result } = renderHook(() => useDebounce(callback, 1000));

    result.current();

    vi.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();

    result.current();
    vi.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalled();
  });
})
