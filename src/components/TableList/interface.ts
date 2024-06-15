export interface Props {
    columns: Column[];
    rows: any;
    height: string
}

interface Column {
    label: string
    width: string
    field: string
}

