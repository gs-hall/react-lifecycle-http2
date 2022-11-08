import React, { useState } from "react";
import LoadingButton from "./LoadingButton";

export default function NoteForm({add, isLoading}) {
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
      <section className="new-note">
        <textarea name="text" onChange={handleChange} value={form.text} />
        <LoadingButton
          type="submit"
          isLoading={isLoading}
          icon="fa-send"
          className="submit"  
        />
      </section>
    </form>
  );
};