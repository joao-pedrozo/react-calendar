import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { v4 } from "uuid";
import * as yup from "yup";

import { CalendarContext } from "../../hooks/useCalendar";
import { api } from "../../services/api";
import colors from "../../utils/colors";
import Button from "../Button/index";
import ColorPicker from "../ColorPicker";
import Input from "../Input";
import TemperatureDisplayer from "../TemperatureDisplayer";
import "./styles.scss";

const schema = yup.object({
  title: yup.string().required("Title field is required"),
  city: yup.string().required("City field is required"),
  date: yup.string().required("Date field is required"),
});

const Form = ({ currentModalVisibility, setShowModal, selectedDate }) => {
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

  const { reminders, setReminders, selectedReminder } =
    useContext(CalendarContext);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  useEffect(() => {
    reset();
    setSelectedColor(selectedReminder?.color || colors[0]);
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

      if (!selectedReminder) {
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
      } else {
        setReminders([
          ...reminders.filter(
            (reminder) => reminder.id !== selectedReminder.id
          ),
          {
            id: selectedReminder.id,
            title,
            color: selectedColor,
            date,
            city,
            temp: resultInSameHour ? resultInSameHour.main.temp : null,
          },
        ]);
      }

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

  const handleCancelButtonPress = () => {
    setShowModal(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-component-wrapper">
      <Input
        label="Title"
        name="title"
        maxLength={30}
        placeholder="Dinner with mom"
        error={errors?.title}
        defaultValue={selectedReminder?.title || ""}
        {...register("title")}
      />
      <Input
        label="City"
        name="city"
        placeholder="New York"
        error={errors?.city}
        defaultValue={selectedReminder?.city || ""}
        {...register("city")}
      />
      <Input
        label="Date"
        name="date"
        placeholder="New York"
        type="datetime-local"
        defaultValue={
          selectedReminder?.date?.slice(0, 16) ||
          selectedDate?.toISOString().slice(0, 16)
        }
        error={errors?.date}
        {...register("date")}
      />
      <ColorPicker
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <TemperatureDisplayer temperature={selectedReminder?.temp} />

      <div className="buttons-wrapper">
        <Button onClick={handleCancelButtonPress} kind="cancel" type="submit">
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default Form;
