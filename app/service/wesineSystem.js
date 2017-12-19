

module.exports = app => {

    const BaseService = require('./baseService')(app);

    class WesineSystem extends BaseService {

        constructor(app) {
            super(app);

            this.table = {
                id: undefined,
                password: undefined,
                name: undefined,
                icon: undefined,
                logo: undefined,
                token: undefined
            };
        }


        async exists(id) {

            if(!this.__parameterExists(id)) {
                return false;
            }

            if (await super.__count('wesinesystem', 'id', { id }) === 1) {
                return true;
            }

            return false;
        }


        async getIdThroughToken(token) {

            try {
                const ids = await this._query(['id'], { token });
                return this.formatReturn(ids[0].id, '');
            } catch (err) {
                return this.defaultReturn;
            }
        }


        async _query(attributes = ['*'], wheres) {
            
            // format query attributes and wheres' attributes
            attributes = this.__formatQueryAttributes(this.table, attributes);
            wheres = this.__formatTableValue(this.table, wheres);

            // query company info through id
            if (wheres.id && await this.exists(wheres.id)) {
                const companies = await super.__query('wesineSystem', attributes, wheres);
                return companies[0] || {};
            }

            // query company info through other attributes
            try {
                return await super.__query('wesineSystem', attributes, wheres);
            } catch (err) {
                return [];
            }
        }


        async _insert(company) {

            // formate company's attributes
            company = this.__formatTableValue(this.table, company);

            // company id or company password doesn't exist
            if (!company.id || !company.password) {
                return false;
            }

            // company exists
            if (await this.exists(company.id)) {
                return false;
            }

            try {
                await super.__insert('wesineSystem', company);
                return true;
            } catch(err) {
                return false;
            }
        }


        async _update(company, wheres) {

            // format company and wheres' attributes
            company = this.__formatTableValue(this.table, company);
            wheres = this.__formatTableValue(this.table, wheres);

            // company doesn't exists
            if (company.id && !await this.exists(company.id)) {
                return false;
            }

            try {
                await super.__update('wesineSystem', company, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }


        async _delete(wheres) {

            // format wheres' attributes
            wheres = this.__formatTableValue(this.table, wheres);

            // company doesn't exists
            if (wheres.id && !await this.exists(wheres.id)) {
                return false;
            }

            try {
                await super.__delete('wesineSystem', wheres);
                return true;
            } catch (err) {
                return false;
            }
        }
    }

    return WesineSystem;
}