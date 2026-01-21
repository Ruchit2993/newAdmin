export const COMMON_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    DELETED: 'deleted',
} as const;

export type COMMON_STATUS = typeof COMMON_STATUS[keyof typeof COMMON_STATUS];

export interface UserInterface {
    id?: number;
    email: string;
    password?: string;
    created_at?: Date;
    updated_at?: Date;
}
