export interface Props {
    columns: Column[];
    rows: any;
    height: string
    editAction?: boolean
    clickEdit?: (row: any) => void
}

interface Column {
    label: string
    width: string
    field: string
}

