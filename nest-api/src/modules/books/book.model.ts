import { AuthorId } from "../authors/author.entity";

export type BookAuthorModel = {
  firstName: string;
  lastName: string;
  photoURL: string;
};

export type BookModel = {
  id: string;
  title: string;
  photoURL: string;
  author: BookAuthorModel;
  yearPublished: number;
};

export type CreateBookModel = {
  title: string;
  authorId: AuthorId;
  photoURL: string;
  yearPublished: number;
};

export type UpdateBookModel = Partial<CreateBookModel>;

export type FilterBooksModel = {
  limit: number;
  offset: number;
  sort?: Partial<Record<keyof BookModel, "ASC" | "DESC">>;
};

export type GetBooksModel = {
  totalCount: number;
  data: BookModel[];
};
