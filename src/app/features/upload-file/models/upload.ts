export interface Upload {
    file: File | null;
    uploading: boolean;
    progress: number;
    completed: boolean;
    errors: string[];
}

export const DEFAULT_UPLOAD: Upload = {
  file: null,
  uploading: false,
  progress: 0,
  completed: false,
  errors: []
};