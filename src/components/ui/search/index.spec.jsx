import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import Search from '.';

beforeEach(() => {
  vi.clearAllMocks();
});

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

const handleSubmit = vi.fn();
const renderSearch = () => (
  render(
    <Search
      placeholder='placeholder'
      handleSubmit={handleSubmit}
    />
  )
);

describe('<Search />', () => {
  it('renders Search correctly', () => {
    const { getByRole } = renderSearch();
    expect(getByRole('textbox')).toBeInTheDocument();
  });

  it('should update search state on input change', async() => {
    const { getByRole } = renderSearch();

    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(input.value).toBe('test');
  });

  it('should debounce the redirection on input change', async () => {
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
    const setIntervalSpy = vi.spyOn(window, 'setTimeout');

    const { getByRole } = renderSearch();

    const input = getByRole('textbox');
  
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.change(input, { target: { value: 'testing' } });

    expect(clearTimeoutSpy).toHaveBeenCalled();

    vi.advanceTimersByTime(1000);

    expect(setIntervalSpy).toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('should redirect on form submission', async () => {
    const { getByRole } = renderSearch();

    const input = getByRole('textbox');
    const submitButton = getByRole('button');

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith('test')
  });
});
