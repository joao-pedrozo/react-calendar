import { useForm } from "react-hook-form";
import { CalendarContext } from "../../hooks/useCalendar";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import BaseModal from "../BaseModal";
import Input from "../Input";
import styles from "./styles.module.scss";
import ColorPicker from "../ColorPicker";
import { useState, useEffect, useContext } from "react";
import { api } from "../../services/api";
import TemperatureDisplayer from "../TemperatureDisplayer";

const ViewAndEditReminderModal = ({ setShowModal, showModal }) => {
  const { reminders, setReminders, selectedReminder } =
    useContext(CalendarContext);

  const [selectedColor, setSelectedColor] = useState(selectedReminder?.color);

  const schema = yup.object({
    title: yup.string().required("Title field is required"),
    city: yup.string().required("City field is required"),
    date: yup.string().required("Date field is required"),
  });

  useEffect(() => {
    reset();
    setSelectedColor(selectedReminder?.color);
  }, [showModal]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

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
        ...reminders.filter((reminder) => reminder.id !== selectedReminder.id),
        {
          id: selectedReminder.id,
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
        message: err?.response?.data?.message?.toUpperCase(),
      });
    }
  };

  return (
    <BaseModal showModal={showModal} setShowModal={setShowModal}>
      <div className={styles.container}>
        <h1>View/Edit Reminder</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Title"
            name="title"
            maxLength={30}
            placeholder="Dinner with mom"
            defaultValue={selectedReminder?.title}
            {...register("title")}
          />
          <Input
            label="City"
            name="city"
            placeholder="New York"
            defaultValue={selectedReminder?.city}
            {...register("city")}
          />
          <Input
            label="Date"
            name="date"
            placeholder="New York"
            type="datetime-local"
            defaultValue={selectedReminder?.date?.slice(0, 16) || ""}
            {...register("date")}
          />
          <ColorPicker
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          <TemperatureDisplayer temperature={selectedReminder.temp} />

          <button type="submit">Botão</button>
        </form>
      </div>
    </BaseModal>
  );
};

export default ViewAndEditReminderModal;
