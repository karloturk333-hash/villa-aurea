import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingWidget from '@/components/ui/BookingWidget';

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

const sunsetPenthouse = {
  name: 'The Sunset Penthouse',
  slug: 'sunset-penthouse',
  priceFrom: 280,
  guests: { min: 2, max: 3 },
};

const gardenResidence = {
  name: 'The Garden Residence',
  slug: 'garden-residence',
  priceFrom: 260,
  guests: { min: 4, max: 6 },
};

describe('BookingWidget — display', () => {
  it('displays the apartment base price per night', () => {
    render(<BookingWidget apartment={sunsetPenthouse} />);
    expect(screen.getByText('€280')).toBeInTheDocument();
    expect(screen.getByText('/night')).toBeInTheDocument();
  });

  it('shows the "Best Rate" badge', () => {
    render(<BookingWidget apartment={sunsetPenthouse} />);
    expect(screen.getByText('Best Rate')).toBeInTheDocument();
  });

  it('shows the "Reserve" call-to-action button', () => {
    render(<BookingWidget apartment={sunsetPenthouse} />);
    expect(screen.getByText('Reserve')).toBeInTheDocument();
  });

  it('shows no-charge disclaimer', () => {
    render(<BookingWidget apartment={sunsetPenthouse} />);
    expect(screen.getByText(/No charge until confirmation/)).toBeInTheDocument();
  });

  it('Reserve link contains the apartment slug', () => {
    render(<BookingWidget apartment={sunsetPenthouse} />);
    const link = screen.getByText('Reserve').closest('a');
    expect(link).toHaveAttribute('href', expect.stringContaining('sunset-penthouse'));
  });

  it('Reserve link contains guest count as query param', () => {
    render(<BookingWidget apartment={sunsetPenthouse} />);
    const link = screen.getByText('Reserve').closest('a');
    expect(link).toHaveAttribute('href', expect.stringContaining('guests=2'));
  });
});

describe('BookingWidget — guest counter', () => {
  it('displays initial guest count of 2', () => {
    render(<BookingWidget apartment={sunsetPenthouse} />);
    expect(screen.getByText('2 guests')).toBeInTheDocument();
  });

  it('increments guest count when plus button is clicked', async () => {
    render(<BookingWidget apartment={sunsetPenthouse} />);
    const addBtn = screen.getByLabelText('Add guest');
    await userEvent.click(addBtn);
    expect(screen.getByText('3 guests')).toBeInTheDocument();
  });

  it('does not exceed apartment maximum guests', async () => {
    render(<BookingWidget apartment={sunsetPenthouse} />);
    const addBtn = screen.getByLabelText('Add guest');
    // Start at 2, max is 3: clicking twice should stop at 3
    await userEvent.click(addBtn);
    await userEvent.click(addBtn);
    expect(screen.getByText('3 guests')).toBeInTheDocument();
  });

  it('decrements guest count when minus button is clicked', async () => {
    render(<BookingWidget apartment={sunsetPenthouse} />);
    const removeBtn = screen.getByLabelText('Remove guest');
    await userEvent.click(removeBtn);
    expect(screen.getByText('1 guest')).toBeInTheDocument();
  });

  it('does not go below 1 guest', async () => {
    render(<BookingWidget apartment={sunsetPenthouse} />);
    const removeBtn = screen.getByLabelText('Remove guest');
    // Start at 2, click twice — should stop at 1
    await userEvent.click(removeBtn);
    await userEvent.click(removeBtn);
    expect(screen.getByText('1 guest')).toBeInTheDocument();
  });

  it('uses singular "guest" for count of 1', async () => {
    render(<BookingWidget apartment={sunsetPenthouse} />);
    const removeBtn = screen.getByLabelText('Remove guest');
    await userEvent.click(removeBtn);
    expect(screen.getByText('1 guest')).toBeInTheDocument();
    expect(screen.queryByText('1 guests')).not.toBeInTheDocument();
  });

  it('supports a higher max for Garden Residence (max 6)', async () => {
    render(<BookingWidget apartment={gardenResidence} />);
    const addBtn = screen.getByLabelText('Add guest');
    // Click 4 times from 2 to reach 6
    await userEvent.click(addBtn);
    await userEvent.click(addBtn);
    await userEvent.click(addBtn);
    await userEvent.click(addBtn);
    expect(screen.getByText('6 guests')).toBeInTheDocument();
  });
});

describe('BookingWidget — price summary', () => {
  it('does not show price summary without any dates', () => {
    render(<BookingWidget apartment={sunsetPenthouse} />);
    expect(screen.queryByText('Total')).not.toBeInTheDocument();
  });

  it('shows price summary when both check-in and check-out dates are set', () => {
    const { container } = render(<BookingWidget apartment={sunsetPenthouse} />);
    const [checkInInput, checkOutInput] = container.querySelectorAll('input[type="date"]');

    fireEvent.change(checkInInput, { target: { value: '2025-07-01' } });
    fireEvent.change(checkOutInput, { target: { value: '2025-07-08' } });

    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('displays correct night count (7 nights)', () => {
    const { container } = render(<BookingWidget apartment={sunsetPenthouse} />);
    const [checkInInput, checkOutInput] = container.querySelectorAll('input[type="date"]');

    fireEvent.change(checkInInput, { target: { value: '2025-07-01' } });
    fireEvent.change(checkOutInput, { target: { value: '2025-07-08' } });

    expect(screen.getByText(/7 nights/)).toBeInTheDocument();
  });

  it('displays the correct total price (€280 × 7 = €1960)', () => {
    const { container } = render(<BookingWidget apartment={sunsetPenthouse} />);
    const [checkInInput, checkOutInput] = container.querySelectorAll('input[type="date"]');

    fireEvent.change(checkInInput, { target: { value: '2025-07-01' } });
    fireEvent.change(checkOutInput, { target: { value: '2025-07-08' } });

    // The total appears in the price summary row
    const totals = screen.getAllByText('€1960');
    expect(totals.length).toBeGreaterThan(0);
  });

  it('displays the Booking.com comparison price (+15%)', () => {
    const { container } = render(<BookingWidget apartment={sunsetPenthouse} />);
    const [checkInInput, checkOutInput] = container.querySelectorAll('input[type="date"]');

    fireEvent.change(checkInInput, { target: { value: '2025-07-01' } });
    fireEvent.change(checkOutInput, { target: { value: '2025-07-08' } });

    // 1960 * 1.15 = 2254
    expect(screen.getByText('€2254')).toBeInTheDocument();
  });

  it('hides price summary when dates are cleared', () => {
    const { container } = render(<BookingWidget apartment={sunsetPenthouse} />);
    const [checkInInput, checkOutInput] = container.querySelectorAll('input[type="date"]');

    fireEvent.change(checkInInput, { target: { value: '2025-07-01' } });
    fireEvent.change(checkOutInput, { target: { value: '2025-07-08' } });
    expect(screen.getByText('Total')).toBeInTheDocument();

    // Clear check-out date
    fireEvent.change(checkOutInput, { target: { value: '' } });
    expect(screen.queryByText('Total')).not.toBeInTheDocument();
  });
});
