import { useForm } from "react-hook-form";
import colors from "../../utils/colors";
import { CalendarContext } from "../../hooks/useCalendar";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import BaseModal from "../BaseModal";
import Input from "../Input";
import styles from "./styles.module.scss";
import ColorPicker from "../ColorPicker";
import { useState, useEffect, useContext } from "react";
import { api } from "../../services/api";

const AddReminderModalModal = ({ setShowModal, showModal }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const { reminders, setReminders, selectedReminder } =
    useContext(CalendarContext);

  const schema = yup.object({
    title: yup.string().required("Title field is required"),
    city: yup.string().required("City field is required"),
    date: yup.string().required("Date field is required"),
  });

  useEffect(() => {
    reset();
    setSelectedColor(colors[0]);
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
        ...reminders,
        {
          title,
          color: selectedColor,
          date: new Date(date),
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
        <h1>View and Edit Reminder</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Title"
            name="title"
            maxLength={30}
            placeholder="Dinner with mom"
            {...register("title")}
          />
          <Input
            label="City"
            name="city"
            placeholder="New York"
            {...register("city")}
          />
          <Input
            label="Date"
            name="date"
            placeholder="New York"
            type="datetime-local"
            defaultValue={selectedReminder.date.slice(0, 16)}
            {...register("date")}
          />
          <ColorPicker
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          <button type="submit">Botão</button>
        </form>
      </div>
    </BaseModal>
  );
};

export default AddReminderModalModal;
