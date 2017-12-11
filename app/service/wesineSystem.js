

module.exports = app => {

    const BaseService = require('./baseService')(app);

    class WesineSystem extends BaseService {

        constructor(app) {
            super(app);

            this.table = {
                id: undefined,
                name: undefined,
                icon: undefined,
                logo: undefined
            }
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


        async _count(attribute, wheres) {

            try {
                return super._count('wesineSystem', attribute, wheres);
            }catch(error) {
                return -1;
            }
        }
    }

    return WesineSystem;
}