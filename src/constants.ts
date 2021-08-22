export const URLS = {
    getUsers: "https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/users",
    getCompanies: "https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/companies",
    contacts: "https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/contacts"
}


export interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    companyId: string
}

export interface Company {
    name: string;
    logo: string;
    description: string;
    id: string;
}

export interface Contact {
    name: string;
    country: string;
    phone: number;
    id: string;
}
