export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    pagesCount: number;
    total: number;
    currentPage: number;
    perPage: number;
    from: number;
    to: number;
    limit: number;
    hasMore: boolean;
  };
}

export interface MutationResponse<T = any> {
  success: boolean;
  data?: T;
  message: string;
}

export type SortDirection = 'asc' | 'desc';
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortDirection;
}

export interface SearchParams extends PaginationParams {
  searchTerms?: string;
  filters?: Record<string, any>;
}
