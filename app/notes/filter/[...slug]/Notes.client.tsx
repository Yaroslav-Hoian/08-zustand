"use client";

import css from "./page.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import fetchNotes from "../../../../lib/api";
import NoteList from "../../../../components/NoteList/NoteList";
import { useEffect, useState } from "react";
import Pagination from "../../../../components/Pagination/Pagination";
import Modal from "../../../../components/Modal/Modal";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import toast, { Toaster } from "react-hot-toast";
import NoteForm from "../../../../components/NoteForm/NoteForm";

const NoteClient = ({ tag }: { tag?: string }) => {
  const [noteWordSearch, setNoteWordSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [debouncedSearch] = useDebounce(noteWordSearch, 1000);

  const { data, isSuccess } = useQuery({
    queryKey: ["noteHubKey", debouncedSearch, page, tag],
    queryFn: () => fetchNotes(debouncedSearch, page, tag),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.notes.length === 0) {
      toast.error("No notes found for your request.");
    }
  }, [data]);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <Toaster />
        <SearchBox
          value={noteWordSearch}
          onChange={(e) => {
            setNoteWordSearch(e.target.value);
            setPage(1);
          }}
        />
        {isSuccess && data?.totalPages > 1 && (
          <Pagination
            totalPages={data?.totalPages ?? 0}
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
        <button className={css.button} onClick={handleOpenModal}>
          Create note +
        </button>
      </div>
      {isOpenModal && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
      {isSuccess && data?.notes.length > 0 && <NoteList notes={data?.notes} />}
    </div>
  );
};

export default NoteClient;
