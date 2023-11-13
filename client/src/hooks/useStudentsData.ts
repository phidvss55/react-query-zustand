import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../apis/student.api";

export const useStudentsData = (
  page: number,
  LIMIT: number,
  onSuccess: () => void,
  onError: () => void,
) => {
  return useQuery({
    queryKey: ["students", page],
    queryFn: () => getStudents(page, LIMIT),
    keepPreviousData: true,
    // refetchInterval: 1000,
    // refetchOnWindowFocus: "always", // refetch on tab focus
    select: (data) => {
      console.log("data", data);
      return data;
    },
    onSuccess,
    onError,
  });
};
