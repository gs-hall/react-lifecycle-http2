import React, { useState, useEffect, useRef } from "react";
import { getList, addItem } from "../http/entityList";
import Note from "./Note";
import NoteForm from "./NoteForm";
import { Oval } from 'react-loader-spinner';
import Icon from "./Icon";

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
    getList().then(
      items => {
        if(isMounted.current) {
          console.log('loaded');
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

  /*
  useEffect(() => {
    if(isAdded) {
      setTimeout(() => {
        setIsAdded(false);
      }, 1000)
    }
  }, [isAdded]);
  */

  const addNote = (note) => {
    //setNotes([...notes, note]);
    addItem(note)
      .then((response) => {
        if(isMounted.current) {
          console.log('added');
          setIsRefreshRequired(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRefresh  = () => {
    setIsRefreshRequired(true);
  };

  return (
    <div>
      <div className="header">
      <h1>Notes</h1>
    
        <button onClick={handleRefresh} className="refresh">
          {
            !isLoading &&
            <Icon icon="fa-refresh" addClassName="refresh" />
          }
          {isLoading &&
            <Oval
              height={10}
              width={10}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          }
        </button>
      </div>
      <div className="notes">
        {notes?.map((note, index) => <Note key={index} note={note} />)}
      </div>
      <NoteForm add={addNote}/>
    </div>
  ); 
};