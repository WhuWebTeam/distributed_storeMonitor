

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

            if(this.parameterExists(id)) {
                return false;
            }

            if (this._count('wesineSytem', 'id', { id }) === 1) {
                return true;
            }

            return false;
        }


        async getIdThroughToken(token) {

            try {
                const ids = await this._query('wesineSystem', ['id'], { token });
                return this.formatReturn(ids[0].id, '');
            } catch (err) {
                return this.defaultReturn;
            }
        }


        async _query(attributes = ['*'], wheres) {
            
            // format query attributes and wheres' attributes
            attributes = this.formatQueryAttributes(this.table, attributes);
            wheres = this.formatTableValue(this.table, wheres);

            // query company info through id
            if (wheres.id && await this.exists(wheres.id)) {
                const companies = await super._query('wesineSystem', attributes, wheres);
                return companies[0] || {};
            }

            // query company info through other attributes
            try {
                return await super._query('wesineSystem', attributes, wheres);
            } catch (err) {
                return [];
            }
        }


        async _insert(company) {

            // formate company's attributes
            company = this.formatTableValue(this.table, company);

            // company id or company password doesn't exist
            if (!company.id || company.password) {
                return false;
            }

            // company doesn't exists
            if (await this.exists(company.id)) {
                return false;
            }

            try {
                await super._insert('wesineSystem', company);
                return true;
            } catch(err) {
                return false;
            }
        }


        async _update(company, wheres) {

            // format company and wheres' attributes
            company = this.formatTableValue(this.table, company);
            wheres = this.formatTableValue(this.table, wheres);

            // company doesn't exists
            if (company.id && !await this.exists(company.id)) {
                return false;
            }

            try {
                await super._update('wesineSystem', company, wheres);
                return true;
            } catch (err) {
                return false;
            }
        }


        async _delete(wheres) {

            // format wheres' attributes
            wheres = this.formatTableValue(this.table, wheres);

            // company doesn't exists
            if (company.id && !await this.exists(company.id)) {
                return false;
            }

            try {
                await super._delete('wesineSystem', wheres);
                return true;
            } catch (err) {
                return false;
            }
        }
    }

    return WesineSystem;
}