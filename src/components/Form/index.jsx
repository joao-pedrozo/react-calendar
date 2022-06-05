import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { v4 } from "uuid";
import * as yup from "yup";

import { CalendarContext } from "../../hooks/useCalendar";
import { api } from "../../services/api";
import colors from "../../utils/colors";
import ColorPicker from "../ColorPicker";
import Input from "../Input";

const schema = yup.object({
  title: yup.string().required("Title field is required"),
  city: yup.string().required("City field is required"),
  date: yup.string().required("Date field is required"),
});

const Form = ({
  currentModalVisibility,
  setShowModal,
  selectedDate,
  action,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { reminders, setReminders } = useContext(CalendarContext);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  useEffect(() => {
    reset();
  }, [currentModalVisibility, reset]);

  const onSubmit = async ({ title, city, date }) => {
    try {
      const weatherResults = await api.get("forecast", {
        params: {
          appid: process.env.REACT_APP_API_KEY,
          units: "metric",
          q: city,
        },
      });

      const resultsInSameDay = weatherResults.data.list.filter(
        (forecast) => forecast.dt_txt.slice(0, 10) === date.slice(0, 10)
      );

      const resultInSameHour = resultsInSameDay.find(
        (result) => result.dt_txt.slice(11, -6) === date.slice(11, -3)
      );

      setReminders([
        ...reminders,
        {
          id: v4(),
          title,
          color: selectedColor,
          date,
          city,
          temp: resultInSameHour ? resultInSameHour.main.temp : null,
        },
      ]);

      setShowModal(false);
    } catch (err) {
      setError("city", {
        type: "manual",
        message:
          err?.response?.data?.message?.charAt(0).toUpperCase() +
          err?.response?.data?.message?.slice(1),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Title"
        name="title"
        maxLength={30}
        placeholder="Dinner with mom"
        error={errors?.title}
        {...register("title")}
      />
      <Input
        label="City"
        name="city"
        placeholder="New York"
        error={errors?.city}
        {...register("city")}
      />
      <Input
        label="Date"
        name="date"
        placeholder="New York"
        type="datetime-local"
        defaultValue={selectedDate.toISOString().slice(0, 16)}
        error={errors?.date}
        {...register("date")}
      />
      <ColorPicker
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <button type="submit">Botão</button>
    </form>
  );
};

export default Form;