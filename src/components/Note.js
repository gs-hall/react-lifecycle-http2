import React from "react";
import Icon from "./Icon";

export default function Note({note, onDelete}) {
  return (
    <div className="note">
      {note?.item?.text}
      <Icon icon="fa-times-circle" addClassName="close" onClick={() => onDelete(note.id)} />
    </div>
  );
};