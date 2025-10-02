import axios from "axios";
import type { Note, NoteTags } from "../types/note";

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const baseUrl = "https://notehub-public.goit.study/api/notes";

interface fetchNotesProps {
  notes: Note[];
  totalPages: number;
}

export interface createNoteProps {
  title: string;
  content: string;
  tag: NoteTags;
}

async function fetchNotes(
  search: string,
  page: number,
  tag?: string,
): Promise<fetchNotesProps> {
  const request = await axios.get<fetchNotesProps>(baseUrl, {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  });

  return request.data;
}

export default fetchNotes;

export async function createNote(note: createNoteProps): Promise<Note> {
  const postRequest = await axios.post<Note>(baseUrl, note, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  });

  return postRequest.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const deleteRequest = await axios.delete<Note>(baseUrl + "/" + id, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  });
  return deleteRequest.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await axios.get<Note>(baseUrl + "/" + id, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  });
  return res.data;
}
