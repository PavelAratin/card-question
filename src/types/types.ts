export interface FormState {
  id?: string;
  question?: QuestionsType;
  answer?: string;
  description?: string;
  resources?: string;
  level?: string;
  clearForm?: boolean;
  questionId?: string
}

export interface QuestionsType {
  answer: string;
  completed: boolean;
  description: string;
  id: string;
  level: number;
  question: string;
  resources: string[];
}
// Расширенный интерфейс с новыми полями
export interface ExtendedQuestionsType extends QuestionsType {
  editDate?: Date;
}

export interface OptionType {
  text: string;
  value: string;
  disabled?: boolean
}

export interface PaginationType {
  data: QuestionsType[]; // массив вопросов
  first: number;        // первая страница
  items: number;        // всего элементов
  last: number;         // последняя страница
  next: number | null;  // следующая страница (или null)
  pages: number;        // всего страниц
  prev: number | null;  // предыдущая страница (или null)
}