export interface ISuggestion {
  phrase: string;
  persistentId: string;
}

export interface IGetAutocompleteResponse {
  phrase: string;
  suggestions: ISuggestion[];
}

export interface Contributor {
  actor: { name: string };
  role: {
    code: string;
    label: string;
  };
}

export interface ISearchItem {
  persistentId: string;
  label: string;
  description: string;
  accessibleAt: string[];
  contributors: Contributor[];
}

export interface ISearchItemsResponse {
  count: number;
  page: number;
  perpage: number;
  pages: number;
  items: ISearchItem[];
}
