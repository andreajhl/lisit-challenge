import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import Alert from '.';

const mockIsShow = vi.fn();
vi.mock('react', async() => {
  const actual = await vi.importActual('react');

  return {
    ...actual,
    useState: isShow => [isShow, mockIsShow],
  }
});

const renderAlert = (props = {}) => (
  render(<Alert {...props} message='message' />)
);

beforeEach(() => {
  vi.clearAllMocks();
});

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

describe('<Alert />', () => {
  it('renders Alert correctly', () => {
    const { getByRole } = renderAlert();
    expect(getByRole('alert')).toBeInTheDocument();
  });

  it('renders Alert correctly title', () => {
    const { getByText } = renderAlert({ title: 'title '});
    expect(getByText('title')).toBeInTheDocument();
  });

  it('execute is change "show" to false, to remove the alert', () => {
    const { getByRole } = renderAlert();

    const alert = getByRole('alert');
    const closeBtn = getByRole('button');

    expect(alert).toBeInTheDocument();

    fireEvent.click(closeBtn);
    expect(mockIsShow).toHaveBeenCalledWith(false);
  });

  it('The alert should disappear after 2000 milliseconds', () => {
    const setIntervalSpy = vi.spyOn(window, 'setTimeout');
    const { getByRole } = renderAlert();

    const alert = getByRole('alert');
    expect(alert).toBeInTheDocument();

    vi.advanceTimersByTime(2000);
    
    expect(setIntervalSpy).toHaveBeenCalled();
    expect(mockIsShow).toHaveBeenCalledWith(false);
  });
});
