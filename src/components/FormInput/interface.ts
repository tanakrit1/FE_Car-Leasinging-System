 export interface FormInputProps {
    inputList: FormInput[];
    returnInputChange: (result: any) => void;
}

interface FormInput {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    width: string;
    value?: string;
    disabled?: boolean
    requied?: boolean
    list?: listSelect[]
}

interface listSelect {
    label: string;
    value: string
}