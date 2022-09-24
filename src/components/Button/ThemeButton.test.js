import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeButton from "./ThemeButton";
import { ThemeProvider } from "../../store/theme-context"

test("Toggle between light and dark mode when the button is clicked", () => {
  render(
    <ThemeProvider>
      <main>
        <ThemeButton />
      </main>
    </ThemeProvider>
  );

  const button = screen.getByText(/Switch to Dark Mode/i);

  userEvent.click(button);
  expect(screen.getByText(/Switch to Light Mode/i)).toBeDefined();
})
