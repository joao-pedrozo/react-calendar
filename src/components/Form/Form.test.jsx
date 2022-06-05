import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { ContextProvider } from "../../hooks/useCalendar";
import Form from "./index";

jest.mock("../../utils/data", () => ({
  getWeatherResults: () => {
    return {
      data: {
        list: [
          {
            main: {
              temp: 24.42,
              feels_like: 23.7,
              temp_min: 24.1,
              temp_max: 24.42,
              pressure: 1015,
              sea_level: 1015,
              grnd_level: 1014,
              humidity: 30,
              temp_kf: 0.32,
            },
            dt_txt: "2022-06-05 21:00:00",
          },
        ],
      },
    };
  },
}));

const ComponentWrapper = ({ children }) => (
  <ContextProvider>{children}</ContextProvider>
);

describe("Form Component", () => {
  it("should render component without breaking", () => {
    render(<Form />, { wrapper: ComponentWrapper });
  });

  it("should be able to create reminder", async () => {
    const setShowModal = jest.fn();

    render(<Form setShowModal={setShowModal} />, { wrapper: ComponentWrapper });

    const title = screen.getByLabelText("Title");
    const city = screen.getByLabelText("City");
    const date = screen.getByLabelText("Date");

    fireEvent.change(title, { target: { value: "Dinner with mom" } });
    fireEvent.change(city, { target: { value: "New York" } });
    fireEvent.change(date, {
      target: { value: new Date().toISOString().slice(0, 16) },
    });

    const submit = await screen.findByText("Save");
    fireEvent.click(submit);

    await waitFor(() => {
      expect(setShowModal).toHaveBeenCalled();
    });
  });
});
