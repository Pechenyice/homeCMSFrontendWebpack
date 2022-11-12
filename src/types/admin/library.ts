export interface ILibraryWordList {
  items: ILibraryWord[];
  total: number;
}

export interface ILibraryWord {
  id: number;
  word: string;
  meaning: string;
}
