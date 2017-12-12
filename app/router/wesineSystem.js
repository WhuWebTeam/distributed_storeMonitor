

module.exports = app => {

    app.get('/', 'wesineSystem.home'); // wesine company home page, used to register new company
    app.get('/api/v1/wesineSystem/info/company', 'wesineSystem.getCompanies'); // used to get all company info
    app.get('/api/v1/wesineSystem/info/company/:companyId', 'wesineSystem.getCompany'); // used to get some company info
    app.post('/api/v1/wesineSystem/companyRegister', 'wesineSystem.registerCompany'); // used to register a new company
    app.delete('/api/v1/wesineSystem/companyDelete', 'wesineSystem.deleteCompany'); // used to delete some company from wesinesystem
}