import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingFlow from '@/components/ui/BookingFlow';

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

vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('BookingFlow — Step 1: Choose Apartment', () => {
  it('renders the step 1 heading', () => {
    render(<BookingFlow />);
    expect(screen.getByText('Choose your apartment')).toBeInTheDocument();
  });

  it('displays all three apartments', () => {
    render(<BookingFlow />);
    expect(screen.getByText('The Sunset Penthouse')).toBeInTheDocument();
    expect(screen.getByText('The Royal Suite')).toBeInTheDocument();
    expect(screen.getByText('The Garden Residence')).toBeInTheDocument();
  });

  it('shows the price for each apartment', () => {
    render(<BookingFlow />);
    expect(screen.getByText(/from €280\/night/)).toBeInTheDocument();
    expect(screen.getByText(/from €320\/night/)).toBeInTheDocument();
    expect(screen.getByText(/from €260\/night/)).toBeInTheDocument();
  });

  it('shows the guest capacity for each apartment', () => {
    render(<BookingFlow />);
    // "Up to X guests · Ym²"
    expect(screen.getByText(/Up to 3 guests/)).toBeInTheDocument();
    expect(screen.getByText(/Up to 4 guests/)).toBeInTheDocument();
    expect(screen.getByText(/Up to 6 guests/)).toBeInTheDocument();
  });

  it('Continue button is disabled when no apartment is selected', () => {
    render(<BookingFlow />);
    const continueBtn = screen.getByText('Continue →');
    expect(continueBtn).toBeDisabled();
  });

  it('Continue button becomes enabled after selecting an apartment', async () => {
    render(<BookingFlow />);
    const penthouseCard = screen.getByText('The Sunset Penthouse').closest('button')!;
    await userEvent.click(penthouseCard);
    const continueBtn = screen.getByText('Continue →');
    expect(continueBtn).not.toBeDisabled();
  });

  it('advances to step 2 when Continue is clicked with a selection', async () => {
    render(<BookingFlow />);
    const penthouseCard = screen.getByText('The Sunset Penthouse').closest('button')!;
    await userEvent.click(penthouseCard);
    const continueBtn = screen.getByText('Continue →');
    await userEvent.click(continueBtn);
    expect(screen.getByText('Select your dates')).toBeInTheDocument();
  });
});

describe('BookingFlow — Step 2: Select Dates', () => {
  async function goToStep2() {
    render(<BookingFlow />);
    const penthouseCard = screen.getByText('The Sunset Penthouse').closest('button')!;
    await userEvent.click(penthouseCard);
    await userEvent.click(screen.getByText('Continue →'));
  }

  it('renders the step 2 heading', async () => {
    await goToStep2();
    expect(screen.getByText('Select your dates')).toBeInTheDocument();
  });

  it('shows check-in and check-out date inputs', async () => {
    const { container } = await (async () => {
      const result = render(<BookingFlow />);
      const penthouseCard = screen.getByText('The Sunset Penthouse').closest('button')!;
      await userEvent.click(penthouseCard);
      await userEvent.click(screen.getByText('Continue →'));
      return result;
    })();
    const dateInputs = container.querySelectorAll('input[type="date"]');
    expect(dateInputs).toHaveLength(2);
  });

  it('Continue button is disabled without dates', async () => {
    await goToStep2();
    const buttons = screen.getAllByText('Continue →');
    const continueBtn = buttons[buttons.length - 1];
    expect(continueBtn).toBeDisabled();
  });

  it('shows Back button to return to step 1', async () => {
    await goToStep2();
    expect(screen.getByText('← Back')).toBeInTheDocument();
  });

  it('Back button returns to step 1', async () => {
    await goToStep2();
    await userEvent.click(screen.getByText('← Back'));
    expect(screen.getByText('Choose your apartment')).toBeInTheDocument();
  });

  it('shows price summary when dates are set (7 nights at €280)', async () => {
    const { container } = render(<BookingFlow />);
    const penthouseCard = screen.getByText('The Sunset Penthouse').closest('button')!;
    await userEvent.click(penthouseCard);
    await userEvent.click(screen.getByText('Continue →'));

    const [checkInInput, checkOutInput] = container.querySelectorAll('input[type="date"]');
    fireEvent.change(checkInInput, { target: { value: '2025-07-01' } });
    fireEvent.change(checkOutInput, { target: { value: '2025-07-08' } });

    expect(screen.getByText('Price summary')).toBeInTheDocument();
    expect(screen.getByText('7 nights')).toBeInTheDocument();
  });
});

describe('BookingFlow — Step 3: Guest Details', () => {
  async function goToStep3() {
    const result = render(<BookingFlow />);
    const penthouseCard = screen.getByText('The Sunset Penthouse').closest('button')!;
    await userEvent.click(penthouseCard);
    await userEvent.click(screen.getByText('Continue →'));

    const [checkInInput, checkOutInput] = result.container.querySelectorAll('input[type="date"]');
    fireEvent.change(checkInInput, { target: { value: '2025-07-01' } });
    fireEvent.change(checkOutInput, { target: { value: '2025-07-08' } });

    const buttons = screen.getAllByText('Continue →');
    await userEvent.click(buttons[buttons.length - 1]);
    return result;
  }

  it('renders the step 3 heading', async () => {
    await goToStep3();
    expect(screen.getByText('Your details')).toBeInTheDocument();
  });

  it('shows Full name and Email fields', async () => {
    await goToStep3();
    expect(screen.getByPlaceholderText(/Clara & Thomas/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/you@example\.com/)).toBeInTheDocument();
  });

  it('Complete Reservation button is disabled without name and email', async () => {
    await goToStep3();
    const completeBtn = screen.getByText('Complete Reservation →');
    expect(completeBtn).toBeDisabled();
  });

  it('Complete Reservation button enables after entering name and email', async () => {
    await goToStep3();
    const nameInput = screen.getByPlaceholderText(/Clara & Thomas/);
    const emailInput = screen.getByPlaceholderText(/you@example\.com/);

    await userEvent.type(nameInput, 'Test Guest');
    await userEvent.type(emailInput, 'test@example.com');

    const completeBtn = screen.getByText('Complete Reservation →');
    expect(completeBtn).not.toBeDisabled();
  });
});

describe('BookingFlow — Step 4: Confirmation', () => {
  async function goToStep4() {
    const result = render(<BookingFlow />);
    const penthouseCard = screen.getByText('The Sunset Penthouse').closest('button')!;
    await userEvent.click(penthouseCard);
    await userEvent.click(screen.getByText('Continue →'));

    const [checkInInput, checkOutInput] = result.container.querySelectorAll('input[type="date"]');
    fireEvent.change(checkInInput, { target: { value: '2025-07-01' } });
    fireEvent.change(checkOutInput, { target: { value: '2025-07-08' } });

    const step2Buttons = screen.getAllByText('Continue →');
    await userEvent.click(step2Buttons[step2Buttons.length - 1]);

    const nameInput = screen.getByPlaceholderText(/Clara & Thomas/);
    const emailInput = screen.getByPlaceholderText(/you@example\.com/);
    await userEvent.type(nameInput, 'Test Guest');
    await userEvent.type(emailInput, 'test@example.com');

    await userEvent.click(screen.getByText('Complete Reservation →'));
    return result;
  }

  it('renders the confirmation heading', async () => {
    await goToStep4();
    expect(screen.getByText('Request received')).toBeInTheDocument();
  });

  it('shows the guest name in the confirmation message', async () => {
    await goToStep4();
    expect(screen.getByText('Test Guest')).toBeInTheDocument();
  });

  it('shows the guest email in the confirmation message', async () => {
    await goToStep4();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('shows the apartment name in the summary', async () => {
    await goToStep4();
    const penthouseNames = screen.getAllByText('The Sunset Penthouse');
    expect(penthouseNames.length).toBeGreaterThan(0);
  });

  it('shows the total price in the confirmation summary', async () => {
    await goToStep4();
    // €280 × 7 nights = €1960
    expect(screen.getByText('€1960')).toBeInTheDocument();
  });

  it('shows Back to Villa Aurea link', async () => {
    await goToStep4();
    const backLink = screen.getByText('Back to Villa Aurea').closest('a');
    expect(backLink).toHaveAttribute('href', '/');
  });
});

describe('BookingFlow — progress indicator', () => {
  it('shows all 4 step labels', () => {
    render(<BookingFlow />);
    expect(screen.getByText('Choose Apartment')).toBeInTheDocument();
    expect(screen.getByText('Select Dates')).toBeInTheDocument();
    expect(screen.getByText('Your Details')).toBeInTheDocument();
    expect(screen.getByText('Confirmation')).toBeInTheDocument();
  });
});
