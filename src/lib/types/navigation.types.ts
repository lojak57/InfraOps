import type { ComponentType } from 'svelte';

export interface NavigationItem {
	href: string;
	label: string;
	icon: ComponentType;
	description: string;
}

export interface NavigationSection {
	title: string;
	items: NavigationItem[];
}

export interface SystemStatus {
	isOnline: boolean;
	text: string;
}

export interface NavigationState {
	mobileMenuOpen: boolean;
	currentPath: string;
}

export interface NavigationConfig {
	sections: NavigationSection[];
	systemStatus: SystemStatus;
	version: string;
	brandName: string;
	brandTagline: string;
} 