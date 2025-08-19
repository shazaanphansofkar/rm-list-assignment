export interface ItemsListFlat {
    folders: FoldersFlat;
    items: ItemsFlat;
}

export interface FoldersFlat {
    columns: string[];
    data: Array<Array<number | null | string>>;
}

export interface ItemsFlat {
    columns: string[];
    data: Array<Array<number | string>>;
}

export interface Item {
    id: number,
    title: string
    folder_id: number,
    isSelected: boolean
}

export interface Folder {
    id: number,
    title: string,
    parent_id: number,
    items?: Item[]
    children?: Folder[],
    isSelected: boolean;
    isIndeterminante: boolean;
}