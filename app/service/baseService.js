module.exports = app => {
    class BaseService extends app.Service {

        constructor(app) {
            super(app);
        }

        _generateResponse(status, data) {
            status = +status;
            if (status >= 400) {
                return {
                    code: status,
                    message: data
                };
            }
            return {
                code: status,
                data
            }
        }

        _judge(entry) {
            if (entry[1] === false) {
                return true;
            } else if (entry[1] === 0) {
                return true;
            } else if (entry[1]) {
                return true;
            } else {
                return false;
            }
        }


        async _update(tableName, obj, wheres) {
            const _this = this;

            // generate query str and values
            const values = [];
            let str = 'update ' + tableName + ' set ';

            // change object to array
            let entries = Object.entries(obj).filter(entry => _this._judge(entry));
            let i = 0;
            for (; i < entries.length; i++) {
                str = str + entries[i][0] + ' = $' + (i + 1) + ', ';
                values.push(entries[i][1]);
            }
            str = str.substr(0, str.length - 2);

            if(JSON.stringify(wheres) === '{}') {
                console.log(str);
                console.log(values);
                await this.app.db.query(str, values);
                return;
            }

            str = str + ' where ';
            entries = Object.entries(wheres).filter(entry => _this._judge(entry));
            for (let j = 0; j < entries.length; j++) {
                str = str + entries[j][0] + ' = $' + (j + i + 1) + ' and ';
                values.push(entries[j][1]);
            }
            str = str.substr(0, str.length - 5);
            console.log(str);
            console.log(values);
            await this.app.db.query(str, values);
        }


        /**
         * Query opration satisfied some condition of database
         * @public
         * @method BaseService#_query
         * @param {String} tableName - name of table waited to query 
         * @param {Array[String]} attributes - attributes wanted to query 
         * @param {Object} wheres - condition  when query table
         * @return {Promise<Array[Object]>}
         * Array include obect releated to table record when query
         * @since 1.0.0
         */
        async _query(tableName, attributes, wheres) {
            const _this = this;

            // generate query str and values
            const values = [];
            let str = 'select ';
            for (const attribute of attributes) {
                str = str + attribute + ', ';
            }
            str = str.substr(0, str.length - 2);
            str = str + ' from ' + tableName;
        
            // when query without where condition(wheres is a {})
            if (JSON.stringify(wheres) === '{}') {
                const result = await this.app.db.query(str, values);
                // console.log(str);
                // console.log(values);
                return result;
            }

            // where query with where condition (wheres is not a {})
            str = str + ' where ';

            // change object to array
            const entries = Object.entries(wheres).filter(entry => _this._judge(entry));
            if (entries.length === 0) {
                str = str.substr(0, str.length - 7);
                const result = await this.app.db.query(str, values);
                // console.log(str);
                // console.log(values);
                return result;
            }

            for (let i = 0; i < entries.length; i++) {
                str = str + entries[i][0] + ' = $' + (i + 1) + ' and ';
                values.push(entries[i][1]);
            }
            str = str.substr(0, str.length - 5);

            // console.log(str);
            // console.log(values);
            const result = await this.app.db.query(str, values);
            return result;
        }
        

        /**
         * Count opration satisfied some condition of database
         * @public
         * @method BaseService#_count
         * @param {String} tableName - name of table waited to oprate
         * @param {String} attribute - attributes wanted to be count of table record
         * @param {Object} wheres - Condition when count table record
         * @return {Promise<Number>}
         * positive number when count table record successed
         * -1 when count table record failed
         * @since 1.0.0
         */
        async _count(tableName, attribute, wheres) {
            attribute = 'count(' + attribute +')';
            let count = await this.query(tableName, [attribute], wheres);
            count = count[0] && +count[0].count || -1;
            return count;
        }


        /**
         * 
         * @param {*} tableName 
         * @param {*} obj 
         */
        async _insert(tableName, obj) {
            const _this = this;

            // generate query str and values
            const values = [];
            let str = 'insert into ' + tableName + '(';
            let temp = '(';
            
            // change object to array
            const entries = Object.entries(obj).filter(entry => _this._judge(entry));
            for (let i = 0; i < entries.length; i++) {
                str = str + entries[i][0] + ', ';
                temp = temp + '$' + (i + 1) + ', ';
                values.push(entries[i][1]);
            }
            str = str.substr(0, str.length - 2) + ')';
            temp = temp.substr(0, temp.length - 2) + ')';
            str = str + ' values ' + temp;

            console.log(str);
            console.log(values);
            await this.app.db.query(str, values);
        }


        /**
         * Delete opration of database
         * @public
         * @method BaseService#_delete
         * @param {String} tableName - name of table waited to oprate 
         * @param {Object} wheres - Condition when delete table record
         * @since 1.0.0
         */
        async _delete(tableName, wheres) {
            const _this = this;

            const values = [];
            let str = 'delete from ' + tableName;
            if (JSON.stringify(wheres) === '{}') {
                await this.app.db.query(str, values);
                return;
            }
            str = str + ' where ';
            const entries = Object.entries(wheres).filter(entry => _this._judge(entry));
            for (let i = 0; i < entries.length; i++) {
                str = str + entries[i][0] + ' = $' + (i + 1) + ' and ';
                values.push(entries[i][1]);
            }
            str = str.substr(0, str.length - 5);

            await this.app.db.query(str, values);
        }
    }

    return BaseService;
}