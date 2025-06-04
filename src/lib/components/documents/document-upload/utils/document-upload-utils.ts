import { FileText, Image, FileIcon } from 'lucide-svelte';
import { documentActions, type CustomerDocument } from '$lib/stores/documentStore';
import type { FileValidation, UploadFile, UploadFiles, FileIconType } from '../types/document-upload.types';

// File validation
export function validateFile(file: File, maxFileSize: number): FileValidation {
	if (file.size > maxFileSize) {
		return { 
			valid: false, 
			error: `File size exceeds ${Math.round(maxFileSize / 1024 / 1024)}MB limit` 
		};
	}
	
	const allowedExtensions = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.txt'];
	const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
	
	if (!allowedExtensions.includes(fileExtension)) {
		return { 
			valid: false, 
			error: 'File type not supported. Please use PDF, DOC, DOCX, JPG, PNG, or TXT files.' 
		};
	}
	
	return { valid: true };
}

// Get file icon based on type
export function getFileIcon(fileName: string): any {
	const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
	switch (extension) {
		case '.pdf':
			return FileText;
		case '.jpg':
		case '.jpeg':
		case '.png':
			return Image;
		default:
			return FileIcon;
	}
}

// Format file size
export function formatFileSize(bytes: number): string {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Drag and drop handlers
export function createDragHandlers() {
	return {
		handleDragOver: (e: DragEvent) => {
			e.preventDefault();
			return true; // dragActive = true
		},
		
		handleDragLeave: (e: DragEvent) => {
			e.preventDefault();
			return false; // dragActive = false
		},
		
		handleDrop: (e: DragEvent) => {
			e.preventDefault();
			const droppedFiles = Array.from(e.dataTransfer?.files || []);
			return { files: droppedFiles, dragActive: false };
		}
	};
}

// File input handler
export function handleFileInput(e: Event): File[] {
	const target = e.target as HTMLInputElement;
	const selectedFiles = Array.from(target.files || []);
	target.value = ''; // Reset input
	return selectedFiles;
}

// Add files to queue with validation
export function addFilesToQueue(
	currentFiles: File[], 
	newFiles: File[], 
	maxFileSize: number, 
	multiple: boolean,
	onError: (message: string, file?: File) => void
): File[] {
	const validFiles = newFiles.filter(file => {
		const validation = validateFile(file, maxFileSize);
		if (!validation.valid) {
			onError(validation.error!, file);
			return false;
		}
		return true;
	});
	
	if (multiple) {
		return [...currentFiles, ...validFiles];
	} else {
		return validFiles.slice(0, 1);
	}
}

// Remove file from queue
export function removeFileFromQueue(files: File[], index: number): File[] {
	return files.filter((_, i) => i !== index);
}

// Simulate file upload with progress
export async function uploadFile(
	file: File, 
	documentType: CustomerDocument['type'], 
	customerId: string,
	jobId?: string,
	tags: string[] = []
): Promise<string> {
	const fileId = `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	
	// Simulate upload progress
	return new Promise((resolve, reject) => {
		let progress = 0;
		const interval = setInterval(() => {
			progress += Math.random() * 20;
			
			if (progress >= 100) {
				clearInterval(interval);
				
				// Create document record
				const documentId = documentActions.addDocument({
					customerId,
					jobId,
					type: documentType,
					fileName: file.name,
					fileUrl: `/documents/${fileId}/${file.name}`,
					status: 'pending',
					uploadedBy: 'Current User', // In real app, get from auth
					fileSize: file.size,
					tags: tags.length > 0 ? tags : [documentType.toLowerCase()],
					metadata: {
						description: `Uploaded ${documentType} document`,
						version: '1.0',
						priority: 'medium'
					}
				});
				
				resolve(documentId);
			}
		}, 200);
		
		// Simulate potential upload failure
		setTimeout(() => {
			if (Math.random() < 0.05) { // 5% chance of failure
				clearInterval(interval);
				reject(new Error('Upload failed'));
			}
		}, 1000);
	});
}

// Upload all files in queue
export async function uploadAllFiles(
	files: File[],
	allowedTypes: CustomerDocument['type'][],
	customerId: string,
	jobId?: string,
	onUploaded?: (documentId: string, document: CustomerDocument) => void,
	onError?: (message: string, file: File) => void
): Promise<void> {
	for (const file of files) {
		try {
			const documentId = await uploadFile(file, allowedTypes[0], customerId, jobId);
			
			if (onUploaded) {
				onUploaded(documentId, {
					id: documentId,
					customerId,
					jobId,
					type: allowedTypes[0],
					fileName: file.name,
					fileUrl: `/documents/${documentId}/${file.name}`,
					uploadDate: new Date(),
					status: 'pending',
					uploadedBy: 'Current User',
					fileSize: file.size,
					tags: [allowedTypes[0].toLowerCase()],
					metadata: {
						description: `Uploaded ${allowedTypes[0]} document`,
						version: '1.0',
						priority: 'medium'
					}
				});
			}
		} catch (error) {
			if (onError) {
				onError(`Failed to upload ${file.name}`, file);
			}
		}
	}
}

// Progress tracking utilities
export function createProgressTracker() {
	let uploadingFiles: UploadFiles = {};
	
	return {
		startUpload: (fileId: string, file: File) => {
			uploadingFiles[fileId] = {
				file,
				progress: 0,
				status: 'uploading'
			};
		},
		
		updateProgress: (fileId: string, progress: number) => {
			if (uploadingFiles[fileId]) {
				uploadingFiles[fileId].progress = progress;
			}
		},
		
		completeUpload: (fileId: string) => {
			if (uploadingFiles[fileId]) {
				uploadingFiles[fileId].progress = 100;
				uploadingFiles[fileId].status = 'success';
			}
		},
		
		failUpload: (fileId: string, error: string) => {
			if (uploadingFiles[fileId]) {
				uploadingFiles[fileId].status = 'error';
				uploadingFiles[fileId].error = error;
			}
		},
		
		getUploadingFiles: () => uploadingFiles,
		
		clearCompleted: () => {
			Object.keys(uploadingFiles).forEach(fileId => {
				if (uploadingFiles[fileId].status !== 'uploading') {
					delete uploadingFiles[fileId];
				}
			});
		}
	};
}

// Check if any files are currently uploading
export function isAnyFileUploading(uploadingFiles: UploadFiles): boolean {
	return Object.values(uploadingFiles).some(f => f.status === 'uploading');
}

// Get upload button text
export function getUploadButtonText(fileCount: number, isUploading: boolean): string {
	if (isUploading) return 'Uploading...';
	return `Upload ${fileCount} File${fileCount > 1 ? 's' : ''}`;
} 