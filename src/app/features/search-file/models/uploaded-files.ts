export interface UploadedFiles {
    files: string[],
    total: number
}

export const DEFAULT_UPLOADED_FILES: UploadedFiles = {
  files: [],
  total: 0
};