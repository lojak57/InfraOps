import type { CustomerDocument } from '$lib/stores/documentStore';

export interface UploadFile {
	file: File;
	progress: number;
	status: 'uploading' | 'success' | 'error';
	error?: string;
}

export interface UploadFiles {
	[key: string]: UploadFile;
}

export interface FileValidation {
	valid: boolean;
	error?: string;
}

export interface UploadConfig {
	customerId: string;
	jobId?: string;
	allowedTypes: CustomerDocument['type'][];
	maxFileSize: number;
	multiple: boolean;
}

export interface UploadEvents {
	uploaded: { documentId: string; document: CustomerDocument };
	error: { message: string; file?: File };
}

export interface DragState {
	dragActive: boolean;
}

export interface FileQueueState {
	files: File[];
	hasFiles: boolean;
	isUploading: boolean;
}

export interface ProgressState {
	uploadingFiles: UploadFiles;
	hasProgress: boolean;
}

export interface FileIconType {
	component: any;
	color?: string;
}

export interface UploadActions {
	addFiles: (files: File[]) => void;
	removeFile: (index: number) => void;
	uploadAllFiles: () => Promise<void>;
	clearFiles: () => void;
	validateFile: (file: File) => FileValidation;
} 