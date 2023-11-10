import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "../apis/products.api";

const InfiniteLoad: React.FC = () => {
  const results = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 1 }) => {
      return getProducts(pageParam);
    },
    getNextPageParam: (lastPage, _) => {
      return { pageNumber: Number(lastPage.data?.currentPage) + 1 };
    },
    getPreviousPageParam: (firstPage, _) => firstPage.data,
  });

  const {
    isLoading,
    data,
    isError,
    error,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = results;

  if (isError) {
    return <h3>{error as string}</h3>;
  }

  if (isLoading) {
    return <h3>Loading</h3>;
  }

  return (
    <div>
      <div>
        {data.pages?.map((product: any, i: number) => {
          return (
            <div key={i}>
              {product?.data?.data?.map((_p: any) => {
                return (
                  <li key={_p.id}>
                    {_p.title} + {_p.brand}
                  </li>
                );
              })}
            </div>
          );
        })}
      </div>
      <div>
        <button
          type="button"
          disabled={!hasNextPage}
          onClick={() => fetchNextPage()}
        >
          Next
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching ... " : null}</div>
    </div>
  );
};

export default InfiniteLoad;
