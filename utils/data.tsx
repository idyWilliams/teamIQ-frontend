
export type DataType = {
    id: number;
    name: string;
    stack: string;
    employmentType: string;
    status: string;
}

export type PendingDataType = {
    id: number;
    name: string;
    stack: string;
    dateSent: string;
    status: string;
}



// export const data: DataType[] = [
//     {id: 1, name: "Kate Morrison", stack: "Product Design", employmentType: "Intern", status: "Active"},
//     {id: 2, name: "Kate Morrison", stack: "Frontend Dev", employmentType: "Intern", status: "Active"},
//     {id: 3,name: "Kate Morrison", stack: "Fullstack Dev", employmentType: "Full-Time", status: "Active"},
//     {id: 4, name: "Kate Morrison", stack: "Backend Dev", employmentType: "Intern", status: "Active"},
//     {id: 5, name: "Kate Morrison", stack: "Fullstack Dev", employmentType: "Full-Time", status: "Active"},
//     {id: 6, name: "Kate Morrison", stack: "Frontend Dev", employmentType: "Intern", status: "Active"},
// ]

// export const pendingData: PendindDataType[] = [
//     {id: 1, name: "Kate Morrison", stack: "Product Design", dateSent: "Jul 02, 25", status: "Active"},
//     {id: 2, name: "Kate Morrison", stack: "Frontend Dev",dateSent: "Jul 02, 25", status: "Active"},
// ]