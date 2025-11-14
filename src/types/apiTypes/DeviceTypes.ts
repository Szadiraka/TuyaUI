

export interface DeviceType{
    id: number;
    deviceUniqueId: string;
    name: string;
    accountId: number | null;
    switchingPower: number;    
}

export enum PermissionLevel{
    None = 0,
    Viewer = 1,
    Operator = 2,
    Editor = 3,
    Owner = 4
}

export interface DeviceUserType{
    device: DeviceType;
    level: PermissionLevel;
    providedAt: string;
}

export interface DeviceUserResponse{
    success: boolean;
    data: DeviceUserType[];
}