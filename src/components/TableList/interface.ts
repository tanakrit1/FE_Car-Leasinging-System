export interface Props {
    columns: Column[];
    rows: any;
    height: string
    editAction?: boolean
    clickEdit?: any
    printAction?: boolean
    clickPrint?: any
    viewAction?: boolean
    clickView?: any
    paymentAction?: boolean
    clickPayment?: any
    removeAction?: boolean
    clickRemove?: any
}

interface Column {
    label: string
    width: string
    field: string
}

