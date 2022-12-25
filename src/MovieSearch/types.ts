export type Movie = {
    readonly title: string;
    readonly year: number;
    readonly released: Date;
    readonly runtime: string;
    readonly genre: string;
    readonly director: string;
    readonly actors: string[];
    readonly plot: string;
    readonly poster: string;
};

export type SearchResult<T> =
    | {
          readonly type: "loading";
      }
    | {
          readonly type: "error";
      }
    | {
          readonly type: "data";
          readonly data: T;
      };
