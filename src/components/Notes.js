import React, { useState, useEffect, useRef } from "react";
import { getList, addItem, deleteItem } from "../http/entityList";
import Note from "./Note";
import NoteForm from "./NoteForm";
import LoadingButton from "./LoadingButton";

export default function Notes() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRefreshRequired, setIsRefreshRequired] = useState(true);
  const [notes, setNotes] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    if(!isRefreshRequired) {
      return;
    }    
    setIsLoading(true);
    setIsError(false);
    getList().then(
      items => {
        if(isMounted.current) {
          setNotes(items.data);
          setIsLoading(false);
          setIsRefreshRequired(false);
        };
      }
    ).catch(
      err => {
        setIsError(true);
        setIsLoading(false);
      })
    return () => isMounted.current = false;
  }, [notes, isRefreshRequired]);

  const addNote = (note) => {
    //setNotes([...notes, note]);
    setIsLoading(true);
    addItem(note)
      .then((response) => {
        if(isMounted.current) {
          setIsRefreshRequired(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRefresh = () => {
    setIsRefreshRequired(true);
  };

  const handleDelete = (id) => {
    setIsLoading(true);
    deleteItem(id);
    setIsRefreshRequired(true);
  };

  return (
    <div>
      <div className="header">
        <h1>Notes</h1>
        <LoadingButton
          onClick={handleRefresh}
          className="refresh"
          isLoading={isLoading}
          icon="fa-refresh"
          color="#4fa94d"
        />
        {isError && <h3 className="error">Something went wrong...</h3>}
      </div>
      <div className="notes">
        {notes?.map((note, index) => <Note key={index} note={note} onDelete={handleDelete} />)}
      </div>
      <NoteForm add={addNote} isLoading={isLoading} />
    </div>
  ); 
};