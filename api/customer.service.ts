import prisma from './prisma.ts';

interface CustomersOption {
id:number;
name: string
email:string;
}

export async function findCustomersOptions (): Promise<CustomersOption[]> {
return await prisma.customer.findMany({
    select: {
        id: true,
        name:true,
        email:true
    },
    orderBy:{ name : 'asc'}
});
}