export interface MCQ {
  q: string;
  o: string[];
  a: string;
}

export interface WrittenQuestion {
  q: string;
  a: string;
}

export interface Lecture {
  id: string;
  name: string;
  mcqs: MCQ[];
  written: WrittenQuestion[];
}
