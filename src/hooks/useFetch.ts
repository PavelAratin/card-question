import { useState } from "react";
import { delayFn } from "../helpers/delayFn";
import { toast } from "react-toastify";

type FetchCallback<T, Arg> = (arg: Arg) => Promise<T>;

type UseFetchReturn<T, Arg> = [
  (arg: Arg) => Promise<T | undefined>,
  boolean,
  string
];

export const useFetch = <T, Arg = void>(cb: FetchCallback<T, Arg>): UseFetchReturn<T, Arg> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const fetchFn = async (arg: Arg) => {
    try {
      setIsLoading(true);
      setError("");
      await delayFn();
      const response = await cb(arg);
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false);
    }
  }
  return [fetchFn, isLoading, error]

}