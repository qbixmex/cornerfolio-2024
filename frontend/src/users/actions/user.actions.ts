'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { User, UserUpdate } from '../interfaces/users';
import { redirect } from 'next/navigation';

export const getUser = async (id: string) => {
	const response = await fetch(`http://localhost:4000/api/users/${id}`);
	return response.json();
};

export const createUser = async (formData: User) => {
	const response = await fetch(`http://localhost:4000/api/users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});

	revalidateTag('users-table');

	return response.json();
};

export const updateUser = async (id: string, formData: UserUpdate) => {
	const payload = {
		name: formData.name,
		email: formData.email,
		type: formData.type,
		jobTitle: formData.jobTitle,
		active: formData.active,
		course: formData.course,
		schedule: formData.schedule,
		startDate: formData.startDate,
		endDate: formData.endDate,
	};

	const response = await fetch(`http://localhost:4000/api/users/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});

	revalidateTag('users-table');
	revalidatePath(`/admin/users/profile/${id}`);

	return response.json();

};

export const updatePassword = async (id: string, password: string) => {

	const response = await fetch(`http://localhost:4000/api/users/${id}/update-password`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ password }),
	});

	return response.json();
};

export const deleteUser = async (id: string) => {
	const response = await fetch(`http://localhost:4000/api/users/${id}`, {
		method: 'DELETE',
	});

	revalidateTag('users-table');
	redirect('/admin/users');

	return response.json();
};
