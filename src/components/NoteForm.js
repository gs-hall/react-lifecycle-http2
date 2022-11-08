import React, { useState } from "react";
import Icon from "./Icon";

export default function NoteForm({add}) {
  const [form, setForm] = useState({text: 'ok'});

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm(prevForm => ({...prevForm, [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    add(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea name="text" onChange={handleChange} value={form.text} />
      <button type="submit" >
        <Icon icon="fa-send" />
      </button>
    </form>
  );
};