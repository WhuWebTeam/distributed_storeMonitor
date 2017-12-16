

module.exports = app => {

    app.get('/', 'wesineSystem.home'); // wesine company home page, used to register new company
    app.get('/api/v1/wesineSystem/info/:companyId', 'wesineSystem.getCompany'); // get some company info
    app.get('/api/v1/wesineSystem/token/:companyId', 'wesineSystem.getToken'); // get company's token
    app.put('/api/v1/wesineSystem/token/:companyId', 'wesineSystem.resetToken'); // reset company user's token
    app.post('/api/v1/wesineSystem/sign/companySignup', 'wesineSystem.register'); // register a new company
    app.post('/api/v1/wesineSystem/sign/companySignin', 'wesineSystem.signIn'); // company user of wesine system sign in
    app.post('/api/v1/wesineSystem/sign/companySignout', 'wesineSystem.signOut')
    app.delete('/api/v1/wesineSystem/companyDelete', 'wesineSystem.deleteCompany'); // delete some company from wesinesystem
}



// app.post('/api/v1/wesineSystem/companyRegister', 'wesineSystem.registerCompany'); // used to register a new company
// attributes belongs to the following object, id, password required
// {
//     id,
//     password,
//     name,
//     icon,
//     logo
// }