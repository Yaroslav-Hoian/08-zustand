import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import fetchNotes from "@/lib/api";
import NoteClient from "./Notes.client";

const debouncedSearch = "";
const page = 1;

interface NoteDetailsProps {
  params: Promise<{ slug?: string[] }>;
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const queryClient = new QueryClient();

  const { slug = [] } = await params;
  const tag = !slug.length || slug[0] === "All" ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["noteHubKey", debouncedSearch, page, tag],
    queryFn: () => fetchNotes(debouncedSearch, page, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NoteDetails;
