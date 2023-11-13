// import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteStudent, getStudent, getStudents } from "../apis/student.api";
import { Students as StudentsType } from "../types/student.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useQueryString } from "../utils/utils";
import classNames from "classnames";
import { toast } from "react-toastify";
import SkeletonLoader from "../components/SkeletonLoader";
import { useEffect, useState } from "react";

const LIMIT = 10;
const Students = () => {
  // const [students, setStudents] = useState<StudentsType>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [errors, setErrors] = useState<any>("");

  // useEffect(() => {
  //   setLoading(true);
  //   getStudents(1, 20)
  //     .then((res) => {
  //       setStudents(res.data.data);
  //       setErrors(undefined);
  //     })
  //     .catch((e) => {
  //       setStudents([]);
  //       setErrors(e);
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  const queryString: { page?: string } = useQueryString();
  const page = Number(queryString.page) || 1;
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["students", page],
    queryFn: () => getStudents(page, LIMIT),
    keepPreviousData: true,
    // refetchInterval: 1000,
    // refetchOnWindowFocus: "always", // refetch on tab focus
  });

  const totalStudents = data?.data?.totalPages || 10;
  const totalPage = Math.ceil(totalStudents / 10);

  const removeStudentMutation = useMutation({
    mutationFn: (id: number | string) => deleteStudent(id),
    onSuccess: (_, id) => {
      toast.success(`Student removed successfully with id ${id}`);
      queryClient.invalidateQueries({
        // trigger to recall the api
        queryKey: ["students", page],
        exact: true,
      });
    },
  });

  const onRemoveStudent = (id: string | number) => {
    removeStudentMutation.mutate(id);
  };

  const onPrefetchStudent = (id: number) => {
    queryClient.prefetchQuery(["student", String(id)], {
      queryFn: () => getStudent(id),
      // staleTime: 0 | Infinity | 1000 * 10,
      // cacheTime: 1000 * 10,
    });
  };

  const fetchStudent = (second: number) => {
    const id = "6";
    queryClient.prefetchQuery(["student", id], {
      queryFn: () => getStudent(id),
      staleTime: second * 1000,
      cacheTime: second * 1000,
    });
  };

  const studentsQuery = useQuery({
    queryKey: ["students", page],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 4000);
      return getStudents(page, LIMIT, controller.signal);
    },
    keepPreviousData: true,
    retry: 3,
  });

  const refetchStudents = () => {
    studentsQuery.refetch();
  };

  const cancelRequestStudents = () => {
    queryClient.cancelQueries({ queryKey: ["students", page] });
  };

  return (
    <div>
      <h1 className="text-lg">Students</h1>
      <div className="flex">
        <div className="mr-4">
          <button
            className="mt-6 rounded bg-blue-500 px-5 py-2 text-white"
            onClick={() => fetchStudent(10)}
          >
            Click 10s
          </button>
        </div>
        <div className="mr-4">
          <button
            className="mt-6 rounded bg-blue-500 px-5 py-2 text-white"
            onClick={() => fetchStudent(2)}
          >
            Click 2s
          </button>
        </div>
        <div className="mr-4">
          <button
            className="mt-6 rounded bg-pink-700 px-5 py-2 text-white"
            onClick={() => refetchStudents()}
          >
            Refetch Students
          </button>
        </div>
        <div className="mr-4">
          <button
            className="mt-6 rounded bg-pink-700 px-5 py-2 text-white"
            onClick={cancelRequestStudents}
          >
            Cancel Request Students
          </button>
        </div>
        <div className="mr-4 mt-8">
          <Link
            to="/students/add"
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 "
          >
            Add Student
          </Link>
        </div>
      </div>

      {isLoading && <SkeletonLoader />}
      {!isLoading && (
        <div className="relative mt-6 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  #
                </th>
                <th scope="col" className="py-3 px-6">
                  Avatar
                </th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.data.map((student) => (
                <tr
                  key={student.id}
                  className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  onMouseEnter={() => onPrefetchStudent(student.id)}
                >
                  <td className="py-4 px-6">{student.id}</td>
                  <td className="py-4 px-6">
                    <img
                      src={student.avatar}
                      alt="student"
                      className="h-5 w-5"
                    />
                  </td>
                  <th
                    scope="row"
                    className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                  >
                    {student.last_name}
                  </th>
                  <td className="py-4 px-6">{student.email}</td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      to={`/students/${student.id}`}
                      className="mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Edit
                    </Link>
                    <button
                      className="font-medium text-red-600 dark:text-red-500"
                      onClick={() => onRemoveStudent(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px">
            <li>
              {page === 1 ? (
                <span className="cursor-not-allowed rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  Previous
                </span>
              ) : (
                <Link
                  className="cursor-pointer rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  to={`/students?page=1`}
                >
                  Previous
                </Link>
              )}
            </li>
            {Array(totalPage)
              .fill(0)
              .map((_, index) => {
                const pageNumber = index + 1;
                const isActive = page === pageNumber;

                return (
                  <li key={pageNumber}>
                    <Link
                      className={classNames(
                        "border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700",
                        {
                          "bg-gray-300 text-gray-700": isActive,
                          "bg-white text-gray-500": !isActive,
                        },
                      )}
                      to={`/students?page=${pageNumber}`}
                    >
                      {pageNumber}
                    </Link>
                  </li>
                );
              })}
            <li>
              {page === totalPage ? (
                <span className="cursor-not-allowed rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  Next
                </span>
              ) : (
                <Link
                  className="cursor-pointer rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  to={`/students?page=${totalPage}`}
                >
                  Next
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Students;
