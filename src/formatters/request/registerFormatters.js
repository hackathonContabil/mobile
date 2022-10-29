export const createFormatter = (data) => {
    return {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        documen: data.document,
        accountingOfficeId: data.accountingOfficeId
    }
}