import React from "react";
import Icon from "./Icon";

export default function Note({note, index, onDelete}) {
  return (
    <div className="note">
      {note?.item?.text}
      <Icon icon="fa-times-circle" addClassName="close" onClick={() => onDelete(index)} />
    </div>
  );
};