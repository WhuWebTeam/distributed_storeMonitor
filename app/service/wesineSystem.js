

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


        async _insert(company) {

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