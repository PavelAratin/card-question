export const delayFn = async <T = void>(delay: number = 1000, value?: T): Promise<T> => {
  return await new Promise((res) => setTimeout(() => res(value as T), delay));
}